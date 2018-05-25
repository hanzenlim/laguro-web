import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "nuka-carousel";
import styled from 'styled-components';
import ReactStars from "react-stars";
import moment from 'moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link as LaguroLink} from 'react-router-dom';

import Icon from './Icon';
import * as actions from "../actions";
import { OFFICE, LISTINGS, REVIEWS } from "../util/strings";
import { Typography, Link, Grid} from './common';
import NewReview from './forms/NewReview';
import ReviewContainer from './ReviewContainer';
import { Margin, Padding } from './common/Spacing';

const Container = styled.div`
    padding: 0 7px;
    min-height: 100vh;
`;

const theme2 = createMuiTheme({
    palette: {
        primary: {
            light: '#FFFFFF',
            main: '#FFFFFF',
            dark: '#FFFFFF',
            contrastText: "#666",
        },
    },
});

const NameDiv = styled.div`
    font-size: 36px;
    margin-bottom: 1%;
`;

const LocationDiv = styled.div`
    font-size: 17px;
`;

const Container1 = styled.div`
    position: relative;
    width: 100%;
    padding-top: 67%;
`;

const Container2 = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
`;

const InfoDiv = styled.div`
    margin-top: 0.7%;
    margin-bottom: 2%;
`;

const DetailsDiv = styled.div`
    display: block;
    margin-left: 4%;
    margin-right: 4%;
    margin-bottom: 15%;
    margin-top: 7%

    @media screen and (min-width : 600px) {
        margin-top: 0;
        margin-left: 25.5%;
        margin-right: 25.5%;
        margin-bottom: 4.5%;
    }
`

const DetailsHeadingDiv = styled.div`
    font-size: 24px;
    display: inline-block;
`;

const ShowMore = styled.div`
    margin-top: 2%;
    opacity: 0.4;
    font-size: 11px;
    text-decoration: underline;
    clear: both;
    cursor: pointer;
`;

const StaffEquipment = styled.div`
    font-size: 16px;
    line-height: 30px;
    color: #484E51;
`;

const StyledAvailAppts = styled(Typography)`
    line-height: 30px;

    && {
        text-transform: underline;
    }
`;

const OfficeReviewsDiv = styled.div`
    margin-top: 4.5%;
    margin-bottom: 3%;
    position: relative;
`;

const MapPinIcon = styled(Icon)`
    margin-right: 3px;
`;

const DownArrow = styled(Icon)`
    margin-right: 1%;
`;

const OfficeCarousel = styled(Carousel)`
    margin-top: 3px;
    position: relative;

    @media screen and (min-width : 600px) {
        margin-top: 0;
    }
`;

const ViewPhotosButton = styled(Button)`
    @media screen and (min-width : 600px) {
        width: 100%;
        height: 1.5rem;
    }
`;

const CarouselButtonLeft = styled(Icon)`
    margin-left: 15px;

    @media screen and (min-width : 600px) {
        margin-left: 50px;
    }
`;

const CarouselButtonRight = styled(Icon)`
    margin-right: 15px;

    @media screen and (min-width : 600px) {
        margin-right: 50px;
    }
`;

const BackToListingsDiv = styled.div`
    height: 45px;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6%;
    margin-bottom: 3%;

    @media screen and (min-width : 600px) {
        position: absolute;
        display: block;
        margin-left: 3%;
        margin-top: 0.5%;
        margin-bottom: 0%;
    }
`;

const BackToListingsTextDiv = styled.div`
    float: left;
    line-height: 45px;
    padding-left: 10px;
`;

const BackToListingsIcon = styled(Icon)`
    float: left;
`;

const ViewPhotosButtonContainer = styled.div`
    display: none;

    @media screen and (min-width : 600px) {
        display: block;
    }
`;

const NumChairsAvailIcon = styled(Icon)`
    path {
        stroke: #000;
        stroke-width: 4px;
        stroke-dasharray: 2,2;
        stroke-linejoin: round;
        fill: none;
    }
`;

const StyledReactStars = styled(ReactStars)`
    line-height: 34px;
    float: right;
`;

const StyledAvailButton = styled(Button)`
    && {
        width: 75%;
        font-size: 13px;
        padding: 0;
        min-height: 18px;
        height: 22px;
        color: white;
        background-color: #67B620;
        text-transform: none;
        min-width: 40px;
    }
`;

const StyledResButton = styled(Button)`

    && {
        width: 75%;
        font-size: 13px;
        padding: 0;
        min-height: 18px;
        height: 22px;
        color: white;
        background-color: #F26B27;
        text-transform: none;
        min-width: 40px;
    }
`;

class OfficeResultIndex extends Component {
    constructor() {
        super();
        this.state = {
            reviewRowNum: 1,
            loaded: false,
            listings: [],
            availApptsInit: false
        };
        this.handleReviewShowMore = this.handleReviewShowMore.bind(this);
    }

    componentDidMount() {
        this.office_id = this.props.match.params.office_id;
        this.props.getOffice(this.office_id, LISTINGS, REVIEWS);
    }

    componentDidUpdate() {
        if (!this.state.availApptsInit && this.state.listings.length == 0 && this.props.office && !Array.isArray(this.props.office) && this.props.office.length != 0) {
            this.loadListings();
            this.setState({ availApptsInit: true });
        }
    }

    async loadListings() {
        let listingsArray = [];
        var i;
        if (this && this.props && this.props.office && this.props.office.listings) {
            for (i = 0; i < this.props.office.listings.length; i ++ ) {
                await this.props.getListing(this.props.office.listings[i].id);
                listingsArray.push(this.props.listing);
            }
        }

        this.setState({ listings : listingsArray});
    }

    handleReviewShowMore() {
        this.setState({
            reviewRowNum: this.state.reviewRowNum + 1,
        });
    }

    renderImages(office) {
        if (!office.imageUrls || !office.imageUrls.length) {
            return <div />;
        } else {
            let imageUrls = office.imageUrls;

            if (office && office.imageUrls && office.imageUrls.length < 3) {
                imageUrls.push(imageUrls[0]);
                if (imageUrls.length === 2) {
                    imageUrls.push(imageUrls[0]);
                }
            }

            return imageUrls.map(url => (
                <Container1 key={url}>
                    <Container2 />
                    <img className="photo-grid-listing-img center" src={url} />
                </Container1>
            ));
        }

    }

    renderEquipment(office) {
        if (office && office.equipment && office.equipment.length) {
            return office.equipment.map(equipment => (
                <div key={equipment.name}>
                    {equipment.name} - ${equipment.price}
                </div>
            ));
        }
        return <div>No Equipment Available</div>;
    }

    renderAvailAppts(office) {
        if (this.state.listings.length > 0) {
            return this.state.listings.map(listing => (
                [<Grid item xs={4}>
                    <LaguroLink to={`/office/${office.id}/listing/${listing.id}`} >
                        <StyledAvailAppts size="t2" color="darkGrey">
                            {moment(listing.startTime).format(
                                'MMMM D, YYYY h:mm - '
                            )}
                            {moment(listing.endTime).format('h:mm a')}
                        </StyledAvailAppts>
                    </LaguroLink>
                </Grid>,
                <Grid item xs={2}>
                    <LaguroLink to={`/office/${office.id}/listing/${listing.id}`} >
                        {!listing.reservations.length > 0 ? <Margin topPerc={3}><StyledAvailButton> Available </StyledAvailButton> </Margin>: <StyledResButton> Reserved </StyledResButton>}
                    </LaguroLink>
                </Grid>,
                <Grid item xs={5}>
                </Grid>]
            ));
        }
        if (office && office.listings) {
            return office.listings.map(listing => (
                [<Grid item xs={4}>
                    <StyledAvailAppts size="t2" color="darkGrey">
                        {moment(listing.startTime).format(
                            'MMMM D, YYYY h:mm - '
                        )}
                        {moment(listing.endTime).format('h:mm a')}
                    </StyledAvailAppts>
                </Grid>,
                <Grid item xs={2}>
                    <Margin topPerc={3}><StyledAvailButton> Available </StyledAvailButton> </Margin>
                </Grid>,
                <Grid item xs={5}>
                </Grid>]
            ));
        }
    }

    render() {
        const { office, auth, officeLoading, reviews } = this.props;

        if (officeLoading) {
            return <Container>Loading...</Container>;
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
                <OfficeCarousel
                    renderCenterLeftControls={({ previousSlide }) => (
                        <CarouselButtonLeft icon="carouselButtonLeft" width="45px" className="carousel-control" onClick={previousSlide}/>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <CarouselButtonRight icon="carouselButtonRight" width="45px" className="carousel-control" onClick={nextSlide} />
                    )}
                    renderBottomLeftControls={({ action }) => (
                        <ViewPhotosButtonContainer>
                            <MuiThemeProvider theme={theme2}>
                                <ViewPhotosButton style={{ marginLeft: "85%", marginBottom: "8%", textTransform: "none", fontSize: "16px"}} variant="raised" color="primary" className="carousel-control" onClick={action}>
                                    View Photos
                                </ViewPhotosButton>
                            </MuiThemeProvider>
                        </ViewPhotosButtonContainer>
                    )}
                    slidesToShow={window.innerWidth >= 600 ? 3 : 1}
                    slideWidth={window.innerWidth >= 600 ? 1.88 : 1}
                    cellSpacing={8}
                    cellAlign="center"
                    slideIndex={1}>

                    {this.renderImages(office)}

                </OfficeCarousel>

                <InfoDiv className="center">
                    <Link style={{ color: "#000" }} to={"/office/search"}>
                        <BackToListingsDiv>
                            <BackToListingsIcon icon="backToListings" width="45px" />
                            <BackToListingsTextDiv> Back to office search </BackToListingsTextDiv>
                        </BackToListingsDiv>
                    </Link>

                    <NameDiv>{office.name}</NameDiv>

                    <LocationDiv>
                        <MapPinIcon icon='map-pin' width="15px" />
                        {office.location}
                    </LocationDiv>

                    <Padding bottomPerc="1.5" />

                    <div>
                        <NumChairsAvailIcon icon="numChairsAvail" width="35px" />
                        <Typography size="t2"> {office.numChairs} </Typography>
                        <div>
                            <Typography size="t5">Chairs</Typography>
                        </div>
                    </div>
<<<<<<< HEAD
                    <div className="profile_section">
                        <h5>{'Reviews for ' + office.name}</h5>
                        {/* if logged out, hide new review form */}
=======
                </InfoDiv>


                <DetailsDiv>
                    <DetailsHeadingDiv>
                        Equipment Available
                    </DetailsHeadingDiv>

                    <hr />

                    <StaffEquipment>

                        <Padding bottomPerc="1" />

                        {this.renderEquipment(office)}
                    </StaffEquipment>

                    <Padding topPerc={5} />

                    <DetailsHeadingDiv>
                        Available Listings
                    </DetailsHeadingDiv>

                    <hr />

                    <Grid container spacing={8}>
                        {this.renderAvailAppts(office)}
                    </Grid>

                    <Padding topPerc={5} />

                    <DetailsHeadingDiv>
                        Reviews ({reviews.length})
                    </DetailsHeadingDiv>

                    <StyledReactStars
                        count={5}
                        edit={false}
                        size={20}
                        value={this.avg_rating}
                    />

                    <hr />

                    <OfficeReviewsDiv>
>>>>>>> first draft of office details page
                        {auth ? (
                            <NewReview
                                reviewee={office}
                                type={OFFICE}
                                reviewerId={auth.id}
                            />
                        ) : (
<<<<<<< HEAD
                            ''
=======
                            <NewReview
                                reviewee={office}
                                type={OFFICE}
                            />
>>>>>>> first draft of office details page
                        )}
                        <Padding bottomPerc={2} />

                        <ReviewContainer
                            revieweeId={office.id}
                            revieweeName={office.name}
                            reviews={reviews}
                            rows={this.state.reviewRowNum}
                        />
                    </OfficeReviewsDiv>

                    <ShowMore className="center" onClick={this.handleReviewShowMore}>
                        <DownArrow icon="downArrow" width="20px" />
                        Show more
                    </ShowMore>

                </DetailsDiv>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        officeLoading: state.offices.isFetching,
        listingLoading: state.listings.isFetching,
        listing: state.listings.selected,
        office: state.offices.selected,
        auth: state.auth,
        reviews: state.reviews.all
    };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
