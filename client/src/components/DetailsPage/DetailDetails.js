import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactStars from 'react-stars';
import { get, isEmpty } from 'lodash';
import { formatListingTime, calculateTimeslots, getStartTime } from '../../util/timeUtil';
import dentistProfileExists from '../../util/userInfo';
import * as actions from '../../actions';
import { Padding } from '../common/Spacing';
import { OFFICE, DENTIST, PATIENT } from '../../util/strings';
import NewReview from '../forms/NewReview';
import ReviewContainer from '../ReviewContainer';
import Icon from '../Icon';
import ReservationOptions from '../forms/ReservationOptions';
import { Box, Grid, Link, Typography, Button, Flex, Modal } from '../common';
import OfficePlaceholderBig from '../images/office-placeholder-big.png';
import Appointments from '../Appointments';
import { isMobile } from '../../util/uiUtil';
import NewDentist from '../forms/NewDentist';
import VerificationModal from '../UploadDocuments';

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

const StyledDescriptionBox = styled(Box)`
    white-space: pre-line;
    ${props => 'overflow: ' + props.overflow + ';'};
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

const reviewPerRow = isMobile() ? 2 : 3;

class DetailDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewRowNum: 1,
            visibleModal: null,
            avg_rating: 0,
            rating_count: 0,
            descShowMore: true,
            selectedStartTime: null,
            selectedReservation: null,
            durationToNextAppointment: null
        };
        this.handleShowMoreReview = this.handleShowMoreReview.bind(this);
        this.handleShowMoreDescription = this.handleShowMoreDescription.bind(
            this
        );
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

    isListingAvailable(listing) {
        if (!listing.reservations) {
            return false;
        }

        const timeslots = calculateTimeslots(listing, listing.reservations);

        const filteredTimeslots = timeslots.map((duration, index) => {
            let timeslotStartTime = getStartTime(index, listing.startTime);
            if (moment(timeslotStartTime).isSameOrBefore(moment())) {
                return 0;
            } else {
                return duration;
            }
        });

        const openSlots = filteredTimeslots.filter(
            durationToNext => durationToNext >= 60
        );

        return !!openSlots.length;
    }

    renderAvailListings(listings) {
        if (Array.isArray(listings) && listings.length !== 0) {
            return listings
                .filter(listing => moment(listing.endTime).isAfter(moment()))
                .map((listing, index) => [
                    <Grid key={index * 3} item xs={8} sm={5}>
                        {this.isListingAvailable(listing) ? (
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
                            {this.isListingAvailable(listing) ? (
                                <StyledAvailButton
                                    onClick={this.handleBookReservation.bind(
                                        this,
                                        listing
                                    )}
                                >
                                    Available
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

    handleShowMoreReview() {
        const reviews = this.props.reviews;
        const rowNum = this.state.reviewRowNum;
        if (reviews && reviews.length > rowNum * reviewPerRow) {
            this.setState({
                reviewRowNum: Math.min(
                    rowNum + 4,
                    Math.ceil(reviews.length / reviewPerRow)
                )
            });
        }
        this.reviewCalc();
    }

    handleShowMoreDescription() {
        this.setState({
            descShowMore: false
        });
    }

    handleBookAppointment = (
        selectedStartTime,
        durationToNextAppointment,
        selectedReservation
    ) => {
        // TODO: Move book appointment modal to this component
        // so we don't have to keep track of function params in state
        if (!get(this, 'props.auth.isVerified')) {
            this.openVerifyUserModal();
            this.setState({ selectedStartTime, selectedReservation, durationToNextAppointment });
        } else {
            this.props.handleBookAppointment(
                selectedStartTime,
                durationToNextAppointment,
                selectedReservation
            );
        }
    }

    openBookAppointmentModal = () => {
        const { selectedStartTime, selectedReservation, durationToNextAppointment } = this.state;

        this.props.handleBookAppointment(
            selectedStartTime,
            durationToNextAppointment,
            selectedReservation
        );
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
                            to={`/office/${
                                office.id
                            }?referrer=dentist&dentistId=${
                                reservation.reservedBy.id
                            }`}
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
                                        handleBookAppointment={this.handleBookAppointment}
                                    />
                                )}
                            </div>
                        </StyledResContentDiv>
                    </Flex>
                </ResCardBox>
            );
        });
    }

    componentDidUpdate(prevProps){
        this.reviewCalc();

        if(this.props.auth !== prevProps.auth && this.state.listing) {
            this.openBookingModal()
        }
    }

    openBookingModal() {
        const { auth } = this.props;

        if (!auth) {
            this.props.toggleLoginModal();
        } else if (!dentistProfileExists(auth)) {
            this.openNewDentistModal();
        } else if (!get(auth, 'dentist.isVerified')) {
            this.openVerifyUserModal();
        } else {
            this.openReservationModal();
        }
    }

    async handleBookReservation(listing) {
        this.setState({ listing });
        this.openBookingModal();
    }

    openModal = modalName => {
        this.setState({ visibleModal: modalName });
    };

    openReservationModal = () => {
        this.openModal('reservationOptions');
    };

    openVerifyUserModal = () => {
        this.openModal('verifyUser');
    }

    openNewDentistModal = () => {
        this.openModal('newDentist');
    }

    closeModal = () => {
        this.setState({ visibleModal: null });
    };

    renderEquipment(office) {
        const eq = office.equipment;
        if (eq && Array.isArray(eq) && eq.length !== 0) {
            return eq.map(e => (
                <div key={e.name}>
                    {e.name} - ${(e.price / 100).toFixed(2)}
                </div>
            ));
        } else {
            return <div> No Equipment Available </div>;
        }
    }

    handleVerifyUserSuccess = () => {
        const { type } = this.props;

        if (type === OFFICE) {
            this.openReservationModal();
        } else {
            this.openBookAppointmentModal();
        }
    }

    render() {
        const {
            auth,
            obj,
            reviews,
            listings,
            ownPage,
            isUserVerified
        } = this.props;
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
                {this.props.type === 'office' &&
                    obj.description && (
                        <Box>
                            <StyledDetailsHeadingBox fontSize={25}>
                                Description
                            </StyledDetailsHeadingBox>
                            <hr />
                            <StyledDescriptionBox
                                overflow={
                                    this.state.descShowMore ? 'hidden' : 'auto'
                                }
                                maxHeight={this.state.descShowMore ? 68 : 300}
                            >
                                {obj.description}
                            </StyledDescriptionBox>
                            <Box mb={10} />
                            {this.state.descShowMore && (
                                <Box mt={10}>
                                    <StyledShowMoreBox
                                        fontSize={1}
                                        className="center"
                                        onClick={this.handleShowMoreDescription}
                                    >
                                        <StyledDownArrow
                                            icon="downArrow"
                                            width="20px"
                                        />
                                        Show more
                                    </StyledShowMoreBox>
                                </Box>
                            )}
                        </Box>
                    )}

                <Box mb={40} />
                <StyledDetailsHeadingBox fontSize={25}>
                    {equipmentOrProcedures}
                </StyledDetailsHeadingBox>
                <hr />
                <Padding bottom={10} />
                <StyledEquipmentBox fontSize={4} color="#484E51">
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
                    {!isEmpty(obj) && (
                        <NewReview
                            reviewee={obj}
                            type={
                                this.props.type === 'office' ? OFFICE : DENTIST
                            }
                            reviewerId={auth && auth.id}
                            alreadyReviewed={
                                auth &&
                                reviews.some(e => e.reviewer.id === auth.id)
                            }
                            ownPage={ownPage}
                            isUserVerified={isUserVerified}
                        />
                    )}
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
                    reviews.length > this.state.reviewRowNum * reviewPerRow &&
                    auth && (
                        <Box mt={20}>
                            <StyledShowMoreBox
                                fontSize={1}
                                className="center"
                                onClick={this.handleShowMoreReview}
                            >
                                <StyledDownArrow
                                    icon="downArrow"
                                    width="20px"
                                />
                                Show more
                            </StyledShowMoreBox>
                        </Box>
                    )}

                <Modal
                    closable
                    open={this.state.visibleModal === 'reservationOptions'}
                    closeModal={this.closeModal}
                >
                    <ReservationOptions
                        listing={this.state.listing}
                        office={obj}
                        auth={auth}
                    />
                </Modal>

                <NewDentist
                    id="newDentistForm"
                    open={this.state.visibleModal === 'newDentist'}
                    closeModal={this.closeModal}
                    onSuccess={this.openVerifyUserModal}
                    auth={auth}
                    message={
                        'Before you can book a reservation, we need you to create a dentist profile.'
                    }
                />

                <VerificationModal
                    userType={this.props.type === OFFICE ? DENTIST : PATIENT}
                    open={this.state.visibleModal === 'verifyUser'}
                    closeModal={this.closeModal}
                    onSuccess={this.handleVerifyUserSuccess}
                />
            </StyledDetailsDiv>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

export { DetailDetails };
export default connect(mapStateToProps, actions)(DetailDetails);
