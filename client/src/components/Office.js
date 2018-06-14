import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import ReactStars from 'react-stars';
import moment from 'moment';
import * as actions from '../actions';
import { USER, REVIEWS, OFFICE, OFFICE_ID, START_TIME } from '../util/strings';
import { formatListingTime } from '../util/timeUtil';
import Icon from './Icon';
import ReviewContainer from './ReviewContainer';
import { Box, Grid, Link, Modal, Typography, Button } from './common';
import { Margin, Padding } from './common/Spacing';
import ReservationOptions from './forms/ReservationOptions';
import CreateDentistProfile from './forms/CreateDentistProfile';
import NewReview from './forms/NewReview';
import OfficePlaceholderBig from './images/office-placeholder-big.png';

let picHeight = window.innerWidth * 0.55;
let padBackToListings = 0;

if (window.innerWidth > 600) {
    picHeight = window.innerHeight - 170;
    padBackToListings = 12;
} else {
    picHeight = window.innerWidth * 0.55;
    padBackToListings = 0;
}

const StyledPicBox = styled(Box)`
    position: relative;
    width: 100%;
`;

const StyledDetailsDiv = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 92%;
    margin-top: 7%;
    @media screen and (min-width: 600px) {
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
        width: 49vw;
    }
`;

const StyledDetailsHeadingBox = styled(Box)`
    display: inline-block;
`;

const StyledShowMoreBox = styled(Box)`
    opacity: 0.4;
    text-decoration: underline;
    clear: both;
    cursor: pointer;
`;

const StyledEquipmentBox = styled(Box)`
    line-height: 30px;
`;

const StyledAvailListings = styled(Typography)`
    line-height: 30px;
    && {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const StyledOfficeReviewsDiv = styled.div`
    position: relative;
`;

const StyledMapPinIcon = styled(Icon)`
    margin-right: 3px;
`;

const StyledDownArrow = styled(Icon)`
    margin-right: 6px;
`;

const StyledOfficeCarousel = styled(Carousel)`
    position: relative;
    @media screen and (min-width: 600px) {
        margin-top: 0;
    }
`;

const StyledCarouselButtonLeftIcon = styled(Icon)`
    margin-left: 15px;
    @media screen and (min-width: 600px) {
        margin-left: 50px;
    }
`;

const StyledCarouselButtonRightIcon = styled(Icon)`
    margin-right: 15px;
    @media screen and (min-width: 600px) {
        margin-right: 50px;
    }
`;

const StyledBackToListingsLink = styled(Link)`
    height: 45px;
    cursor: pointer;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 22px;
    margin-bottom: 10px;
    @media screen and (min-width: 600px) {
        position: absolute;
        display: block;
        margin-left: 3%;
        margin-top: 0;
        margin-bottom: 0;
    }
`;

const StyledBackToListingsTextBox = styled(Box)`
    float: left;
    line-height: 45px;
    padding-left: 10px;
`;

const StyledBackToListingsIcon = styled(Icon)`
    float: left;
`;

const StyledReactStars = styled(ReactStars)`
    line-height: 35px;
    float: right;
`;

const StyledAvailButton = styled(Button)`
    && {
        width: 75%;
        font-size: 13px;
        padding: 0;
        min-height: 18px;
        height: 22px;
        background-color: #67b620;
        min-width: 40px;
        margin-left: -20px;
    }
`;

const StyledResButton = StyledAvailButton.extend`
    && {
        background-color: #f26b27;
    }
`;

const StyledCarouselImg = styled.img`
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: auto;
`;

class OfficeResultIndex extends Component {
    constructor() {
        super();
        this.state = {
            reviewRowNum: 1,
            loaded: false,
            availListingsListings: false,
            isModalOpen: false,
            showReservationOptions: false
        };
        this.handleReviewShowMore = this.handleReviewShowMore.bind(this);
    }

    componentDidMount() {
        this.office_id = this.props.match.params.office_id;
        this.props.getOffice(this.office_id, REVIEWS);
        this.props.queryListings(OFFICE_ID, this.office_id, {
            sortKey: START_TIME,
            rangeStart: moment()
                .utc()
                .format()
        });
    }

    async loadDentist() {
        const { auth } = this.props;
        if (!auth || !auth.dentistId) {
            return null;
        }

        await this.props.getDentist(auth.dentist.id, USER);

        const { dentist } = this.props;

        return dentist;
    }

    handleReviewShowMore() {
        const reviews = this.props.reviews;
        const rowNum = this.state.reviewRowNum;
        if (reviews && reviews.length > rowNum * 3) {
            this.setState({
                reviewRowNum: Math.min(
                    rowNum + 4,
                    Math.ceil(reviews.length / 3)
                )
            });
        }
    }

    async handleBookReservation(listing) {
        const { auth } = this.props;

        if (!auth.dentistId) {
            await this.loadDentist();
        }

        if (auth) {
            this.setState({
                isModalOpen: true,
                listing
            });
        } else {
            this.props.toggleLoginModal();
        }
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
            listing: null
        });
    };

    handleSubmission() {
        this.setState({ showReservationOptions: true });
    }

    dentistProfileExists() {
        const { auth } = this.props;
        return !!auth.dentistId;
    }

    renderImages(office) {
        if (
            !(
                office.constructor === Object &&
                Object.keys(office).length !== 0
            ) ||
            (office && office.imageUrls && office.imageUrls.length === 0)
        ) {
            return [
                <StyledPicBox pt={picHeight} key="1">
                    <StyledCarouselImg
                        src={OfficePlaceholderBig}
                        alt="No image available"
                    />
                </StyledPicBox>,
                <StyledPicBox pt={picHeight} key="2">
                    <StyledCarouselImg
                        src={OfficePlaceholderBig}
                        alt="No image available"
                    />
                </StyledPicBox>,
                <StyledPicBox pt={picHeight} key="3">
                    <StyledCarouselImg
                        src={OfficePlaceholderBig}
                        alt="No image available"
                    />
                </StyledPicBox>
            ];
        } else {
            let imageUrls = office.imageUrls;

            if (Array.isArray(imageUrls)) {
                imageUrls = imageUrls.slice();
                imageUrls.splice(0, 0, imageUrls[imageUrls.length - 1]);
                imageUrls.splice(imageUrls.length - 1, 1);

                if (imageUrls.length < 3) {
                    imageUrls.push(imageUrls[0]);
                    if (imageUrls.length === 2) {
                        imageUrls.push(imageUrls[0]);
                    }
                }

                return imageUrls.map(url => (
                    <StyledPicBox pt={picHeight} key={url}>
                        <StyledCarouselImg src={url} alt="No image available" />
                    </StyledPicBox>
                ));
            }
            return null;
        }
    }

    renderEquipment(office) {
        const eq = office.equipment;
        if (eq && Array.isArray(eq) && eq.length !== 0) {
            return eq.map(e => (
                <div key={e.name}>
                    {e.name} - ${e.price}
                </div>
            ));
        } else {
            return <div> No Equipment Available </div>;
        }
    }

    renderAvailListings(listings) {
        if (Array.isArray(listings) && listings.length !== 0) {
            return listings
                .filter(listing => moment(listing.startTime).isAfter(moment()))
                .map((listing, index) => [
                    <Grid key={index * 3} item xs={5}>
                        <StyledAvailListings
                            onClick={this.handleBookReservation.bind(
                                this,
                                listing
                            )}
                            size="t2"
                            color="darkGrey"
                        >
                            {formatListingTime(
                                listing.startTime,
                                listing.endTime
                            )}
                        </StyledAvailListings>
                    </Grid>,
                    <Grid key={index * 3 + 1} item xs={2}>
                        {listing.reservations &&
                        !listing.reservations.length > 0 ? (
                                <Margin top={3}>
                                    <StyledAvailButton
                                        onClick={this.handleBookReservation.bind(
                                            this,
                                            listing
                                        )}
                                    >
                                        {' '}
                                    Available{' '}
                                    </StyledAvailButton>
                                </Margin>
                            ) : (
                                <Margin top={3}>
                                    <StyledResButton> Reserved </StyledResButton>
                                </Margin>
                            )}
                    </Grid>,
                    <Grid key={index * 3 + 2} item xs={5} />
                ]);
        } else {
            return <div> All listings currently sold out. </div>;
        }
    }

    render() {
        let { office, auth, reviews, listings } = this.props;
        const office_id = this.props.match.params.office_id;
        if (office.id && office.id.valueOf() !== office_id.valueOf()) {
            office = {};
            listings = [];
        } else if (
            !(office.constructor === Object && Object.keys(office).length !== 0)
        ) {
            listings = [];
        } else if (
            office &&
            office.listings &&
            office.listings.length < listings.length
        ) {
            listings = [];
        }

        // calculate avg rating
        if (reviews && reviews.length) {
            this.avg_rating =
                reviews
                    .map(review => review.rating)
                    .reduce((acc, rating) => acc + rating, 0) / reviews.length;
            this.rating_count = reviews.length;
        } else {
            this.avg_rating = 0;
            this.rating_count = 0;
        }

        return (
            <div>
                <StyledOfficeCarousel
                    renderCenterLeftControls={({ previousSlide }) => (
                        <StyledCarouselButtonLeftIcon
                            icon="carouselButtonLeft"
                            width="45px"
                            className="carousel-control"
                            onClick={previousSlide}
                        />
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <StyledCarouselButtonRightIcon
                            icon="carouselButtonRight"
                            width="45px"
                            className="carousel-control"
                            onClick={nextSlide}
                        />
                    )}
                    renderBottomCenterControls={() => <div />}
                    slidesToShow={window.innerWidth >= 600 ? 3 : 1}
                    slideWidth={window.innerWidth >= 600 ? 1.88 : 1}
                    cellSpacing={8}
                    cellAlign="center"
                    slideIndex={1}
                >
                    {this.renderImages(office)}
                </StyledOfficeCarousel>

                <Padding bottom={padBackToListings} />

                <div className="center">
                    <StyledBackToListingsLink to={'/office/search'}>
                        <StyledBackToListingsIcon
                            icon="backToListings"
                            width="45px"
                        />
                        <StyledBackToListingsTextBox color="#000">
                            {' '}
                            Back to office search{' '}
                        </StyledBackToListingsTextBox>
                    </StyledBackToListingsLink>

                    <Box fontSize={36}>{office.name}</Box>
                    <Padding bottom={12} />

                    <Box fontSize={17}>
                        <StyledMapPinIcon icon="map-pin" width="15px" />
                        {office.location}
                    </Box>

                    <Padding bottom={18} />

                    <div>
                        <Icon icon="numChairsAvail" width="27px" />
                        <Typography size="t4"> {office.numChairs} </Typography>
                        <div>
                            <Typography fontSize={1}>Chairs</Typography>
                        </div>
                    </div>
                </div>

                <Padding bottom={12} />

                <StyledDetailsDiv>
                    <StyledDetailsHeadingBox fontSize={25}>
                        {' '}
                        Equipment Available{' '}
                    </StyledDetailsHeadingBox>

                    <hr />

                    <Padding bottom={10} />

                    <StyledEquipmentBox fontSize={18} color="#484E51">
                        <Padding bottom="1" />
                        {this.renderEquipment(office)}
                    </StyledEquipmentBox>

                    <Padding bottom={40} />

                    <StyledDetailsHeadingBox fontSize={25}>
                        Current Listings
                    </StyledDetailsHeadingBox>

                    <hr />

                    <Padding bottom={10} />

                    <Grid container spacing={8}>
                        {this.renderAvailListings(listings)}
                    </Grid>

                    <Padding bottom={40} />

                    <StyledDetailsHeadingBox fontSize={25}>
                        Reviews ({reviews.length})
                    </StyledDetailsHeadingBox>

                    <StyledReactStars
                        count={5}
                        edit={false}
                        size={20}
                        value={this.avg_rating}
                    />

                    <hr />

                    <Padding bottom={10} />

                    <StyledOfficeReviewsDiv>
                        {auth ? (
                            <NewReview
                                reviewee={office}
                                type={OFFICE}
                                reviewerId={auth.id}
                            />
                        ) : (
                            <NewReview reviewee={office} type={OFFICE} />
                        )}
                        <Padding bottom={12} />

                        <ReviewContainer
                            revieweeId={office.id}
                            revieweeName={office.name}
                            reviews={reviews}
                            rows={this.state.reviewRowNum}
                        />
                    </StyledOfficeReviewsDiv>

                    {reviews.length > 0 &&
                        reviews.length > this.state.reviewRowNum * 3 &&
                        auth && (
                        <StyledShowMoreBox
                            fontSize={11}
                            className="center"
                            onClick={this.handleReviewShowMore}
                        >
                            <StyledDownArrow
                                icon="downArrow"
                                width="20px"
                            />
                                Show more
                        </StyledShowMoreBox>
                    )}
                </StyledDetailsDiv>

                <Modal
                    closable
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    {!this.state.showReservationOptions &&
                        !this.dentistProfileExists() && (
                        <CreateDentistProfile
                            handleSubmission={this.handleSubmission.bind(
                                this
                            )}
                        />
                    )}
                    {this.dentistProfileExists() && (
                        <ReservationOptions
                            listing={this.state.listing}
                            office={office}
                            auth={auth}
                        />
                    )}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        listings: state.listings.all,
        office: state.offices.selected,
        dentist: state.dentists.selectedDentist,
        auth: state.auth,
        reviews: state.reviews.all
    };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
