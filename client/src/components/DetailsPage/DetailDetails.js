import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import ReactStars from 'react-stars';
import { formatListingTime, calculateTimeslots } from '../../util/timeUtil';
import * as actions from '../../actions';
import { Padding } from '../common/Spacing';
import { OFFICE, DENTIST, USER, ACTIVE } from '../../util/strings';
import NewReview from '../forms/NewReview';
import ReviewContainer from '../ReviewContainer';
import Icon from '../Icon';
import ReservationOptions from '../forms/ReservationOptions';
import CreateDentistProfile from '../forms/CreateDentistProfile';
import { Box, Modal, Grid, Link, Typography, Button, Flex } from '../common';
import OfficePlaceholderBig from '../images/office-placeholder-big.png';
import Appointments from '../Appointments';

const StyledOfficeFlex = styled(Flex)`
    height: 100%;
`;

const StyledOfficeImg = styled.img`
    width: 80px;
    height: auto;
`;

const StyledResContentDiv = styled.div`
    && {
        font-size: 14px;
    }
`;

const ResCardBox = styled(Box)`
    width: 295px;
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

const StyledListingsTyp = styled(Typography)`
    line-height: 30px;
    && {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const StyledReviewsDiv = styled.div`
    position: relative;
`;

const StyledDownArrow = styled(Icon)`
    margin-right: 6px;
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
    }
`;

const StyledResButton = StyledAvailButton.extend`
    && {
        background-color: #f26b27;
    }
`;

class DetailDetails extends Component {
    constructor() {
        super();
        this.state = {
            reviewRowNum: 1,
            isModalOpen: false,
            avg_rating: 0,
            rating_count: 0
        };
        this.handleReviewShowMore = this.handleReviewShowMore.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    componentDidUpdate() {
        this.reviewCalc();
    }

    handleSubmission() {
        this.setState({ showReservationOptions: true });
    }

    dentistProfileExists() {
        const { auth } = this.props;
        return auth && auth.dentistId;
    }

    reviewCalc() {
        const { reviews } = this.props;

        if (reviews.length === this.state.rating_count) {
            return;
        }
        let avg_rating = 0;
        let rating_count = 0;

        // calculate avg rating
        if (reviews && reviews.length) {
            avg_rating =
                reviews
                    .map(review => review.rating)
                    .reduce((acc, rating) => acc + rating, 0) / reviews.length;
            rating_count = reviews.length;
        }

        this.setState({ avg_rating, rating_count });
    }

    checkAvailability(listing) {
        const filteredReservations = listing.reservations.filter(
            res => res.status === ACTIVE
        );
        const timeSlots = calculateTimeslots(listing, filteredReservations);

        const openSlots = timeSlots.filter(
            durationToNext => durationToNext >= 60
        );
        return !!openSlots.length;
    }

    renderAvailListings(listings) {
        if (Array.isArray(listings) && listings.length !== 0) {
            return listings
                .filter(listing => moment(listing.startTime).isAfter(moment()))
                .map((listing, index) => [
                    <Grid key={index * 3} item xs={8} sm={5}>
                        {this.checkAvailability(listing) ? (
                            <StyledListingsTyp
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
                            </StyledListingsTyp>
                        ) : (
                            <StyledListingsTyp size="t2" color="darkGrey">
                                {formatListingTime(
                                    listing.startTime,
                                    listing.endTime
                                )}
                            </StyledListingsTyp>
                        )}
                    </Grid>,
                    <Grid key={index * 3 + 1} item xs={4} sm={2}>
                        <Box mt={1} ml={[0, -20]}>
                            {this.checkAvailability(listing) ? (
                                <StyledAvailButton
                                    onClick={this.handleBookReservation.bind(
                                        this,
                                        listing
                                    )}
                                >
                                    {' '}
                                    Available{' '}
                                </StyledAvailButton>
                            ) : (
                                <StyledResButton> Reserved </StyledResButton>
                            )}
                        </Box>
                    </Grid>,
                    <Grid key={index * 3 + 2} item xs={false} sm={5} />
                ]);
        } else {
            return <div> All listings currently sold out. </div>;
        }
    }

    handleReviewShowMore() {
        const reviews = this.props.reviews;
        const rowNum = this.state.reviewRowNum;
        if (
            reviews &&
            reviews.length > rowNum * (window.innerWidth > 600 ? 3 : 2)
        ) {
            this.setState({
                reviewRowNum: Math.min(
                    rowNum + 4,
                    Math.ceil(
                        reviews.length / (window.innerWidth > 600 ? 3 : 2)
                    )
                )
            });
        }
        this.reviewCalc();
    }

    renderProcedures(dentist) {
        const pc = dentist && dentist.procedures;
        if (pc && Array.isArray(pc) && pc.length !== 0) {
            return pc.map(p => (
                <div key={p.name}>
                    {p.name} - {p.duration} min
                </div>
            ));
        } else {
            return <div> No procedures Available </div>;
        }
    }

    renderAppointments() {
        const { auth, obj, reservations } = this.props;

        if (!reservations || (reservations && reservations.length === 0)) {
            return (
                <Box width={1}>Sorry, no available appointments for now.</Box>
            );
        }
        return reservations.map((reservation, index) => {
            const office = reservation.office;
            const officeImage =
                Array.isArray(office.imageUrls) && office.imageUrls.length !== 0
                    ? office.imageUrls[0]
                    : OfficePlaceholderBig;
            return (
                <ResCardBox
                    key={index}
                    p={2}
                    className="reservation card-panel grey lighten-5"
                >
                    <Flex justifyContent="space-evenly">
                        <Link
                            className="blue-text text-darken-2"
                            to={`/office/${office.id}`}
                        >
                            <StyledOfficeFlex
                                flexDirection="column"
                                justifyContent="center"
                            >
                                <Box fontSize={3}>{office.name}</Box>
                                <StyledOfficeImg src={officeImage} alt="" />
                            </StyledOfficeFlex>
                        </Link>
                        <StyledResContentDiv className="content">
                            <div className="top-bar">
                                <Box>
                                    {moment(reservation.startTime).format(
                                        'MMM D, h:mm a - '
                                    )}
                                    {moment(reservation.endTime).format(
                                        'h:mm a'
                                    )}
                                </Box>
                            </div>
                            <Box pb={2} />
                            <div className="center">
                                {reservation && (
                                    <Appointments
                                        reservation={reservation}
                                        auth={auth}
                                        dentist={obj}
                                        handleBookAppointment={
                                            this.props.handleBookAppointment
                                        }
                                    />
                                )}
                            </div>
                        </StyledResContentDiv>
                    </Flex>
                </ResCardBox>
            );
        });
    }

    async loadDentist() {
        const { auth } = this.props;
        if (!auth || !auth.dentist) {
            return null;
        }

        await this.props.getDentist(auth.dentist.id, USER);

        const { dentist } = this.props;

        return dentist;
    }

    async handleBookReservation(listing) {
        const { auth } = this.props;

        if (isEmpty(this.props.dentist)) {
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
        });
    };

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

    render() {
        const { auth, obj, reviews, listings } = this.props;
        let equipmentOrProcedures;
        let listingsOrAppointments;
        if (this.props.type === 'office') {
            equipmentOrProcedures = 'Equipment Available';
            listingsOrAppointments = 'Current Listings';
        } else {
            equipmentOrProcedures = 'Procedures';
            listingsOrAppointments = 'Appointments';
        }
        return (
            <StyledDetailsDiv>
                <StyledDetailsHeadingBox fontSize={25}>
                    {' '}
                    {equipmentOrProcedures}{' '}
                </StyledDetailsHeadingBox>

                <hr />

                <Padding bottom={10} />

                <StyledEquipmentBox fontSize={18} color="#484E51">
                    <Padding bottom="1" />
                    {this.props.type === 'office'
                        ? this.renderEquipment(obj)
                        : this.renderProcedures(obj)}
                </StyledEquipmentBox>

                <Padding bottom={40} />

                <StyledDetailsHeadingBox fontSize={25}>
                    {listingsOrAppointments}
                </StyledDetailsHeadingBox>

                <hr />

                <Padding bottom={10} />

                {this.props.type === 'office' ? (
                    <Grid container spacing={8}>
                        {this.renderAvailListings(listings)}
                    </Grid>
                ) : (
                    <Flex justifyContent="space-evenly" flexWrap="wrap">
                        {this.renderAppointments()}
                    </Flex>
                )}

                <Padding bottom={40} />

                <StyledDetailsHeadingBox fontSize={25}>
                    Reviews ({this.state.rating_count})
                </StyledDetailsHeadingBox>

                <StyledReactStars
                    count={5}
                    edit={false}
                    size={20}
                    value={this.state.avg_rating}
                />

                <hr />

                <Padding bottom={10} />

                <StyledReviewsDiv>
                    {(obj.constructor === Object && Object.keys(obj).length !== 0) &&
                        <NewReview
                            reviewee={obj}
                            type={this.props.type === "office" ? OFFICE : DENTIST}
                            reviewerId={auth && auth.id}
                            wasReviewed={auth && reviews.some(e => e.reviewer.id === auth.id)}
                            own={auth && auth.dentistId === (this.props.type === 'office' ? obj.host.id : obj.id)}
                        />}
                    <Padding bottom={12} />

                    {obj && (
                        <ReviewContainer
                            revieweeId={obj.id}
                            revieweeName={
                                this.props.type === 'office'
                                    ? obj.name
                                    : obj && obj.user
                                        ? obj.user.name
                                        : ''
                            }
                            reviews={reviews}
                            rows={this.state.reviewRowNum}
                        />
                    )}
                </StyledReviewsDiv>

                {reviews.length > 0 &&
                    reviews.length >
                        this.state.reviewRowNum *
                            (window.innerWidth > 600 ? 3 : 2) &&
                    auth && (
                    <Box mt={20}>
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
                    </Box>
                )}

                {this.props.type === 'office' && (
                    <Modal
                        closable
                        open={this.state.isModalOpen}
                        onClose={this.closeModal}
                    >
                        {!this.state.showReservationOptions &&
                            !this.dentistProfileExists() && (
                            <CreateDentistProfile
                                handleSubmission={this.handleSubmission}
                            />
                        )}
                        {this.dentistProfileExists() && (
                            <ReservationOptions
                                listing={this.state.listing}
                                office={obj}
                                auth={auth}
                            />
                        )}
                    </Modal>
                )}
            </StyledDetailsDiv>
        );
    }
}

export default connect(null, actions)(DetailDetails);
