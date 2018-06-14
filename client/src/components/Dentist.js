import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactStars from 'react-stars';
import moment from 'moment';
import * as materialize from 'materialize-css/dist/js/materialize';
import Icon from './Icon';
import * as actions from '../actions';
import { Link, Grid } from './common';
import NewReview from './forms/NewReview';
import ReviewContainer from './ReviewContainer';
import { Padding } from './common/Spacing';
import Appointments from './Appointments';
import BookAppointment from './forms/BookAppointment';

import { DENTIST } from '../util/strings';
import {
    dentistFragment,
    officeFragment,
    reservationFragment,
    appointmentFragment,
    reviewerFragment,
    filterActive
} from '../util/fragments';

const StyledResContentDiv = styled.div`
    && {
        width: 100%;
        font-size: 14px;
    }
`;

const NameDiv = styled.div`
    font-size: 36px;
    margin-bottom: 1%;
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
    margin-top: 7%;

    @media screen and (min-width: 600px) {
        margin-top: 0;
        margin-left: 25.5%;
        margin-right: 25.5%;
        margin-bottom: 4.5%;
    }
`;

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
    color: #484e51;
`;

const DentistReviewsDiv = styled.div`
    margin-top: 4.5%;
    margin-bottom: 3%;
    position: relative;
`;

const DownArrow = styled(Icon)`
    margin-right: 1%;
`;

const BackToListingsDiv = styled.div`
    height: 45px;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6%;
    margin-bottom: 3%;

    @media screen and (min-width: 600px) {
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

const StyledReactStars = styled(ReactStars)`
    line-height: 34px;
    float: right;
`;

const StyledProfPic = styled.img`
    border-radius: 50%;
    display: block;
    margin: auto;
    width: 15%;
`;

const dentistQuery = `
    query ($id: String!) {
        getDentist(id: $id) {
            ${dentistFragment}
            user {
                name
                imageUrl
            }
            reservations(${filterActive}) {
                ${reservationFragment}
                appointments(${filterActive}) {
                    ${appointmentFragment}
                }
                office {
                    ${officeFragment}
                }
            }
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;

class Dentist extends Component {
    constructor() {
        super();
        this.state = {
            reviewRowNum: 1,
            isModalOpen: false,
            selectedStartTime: null,
            durationToNextAppointment: null,
            selectedReservation: {},
            isFetching: true
        };
        this.handleReviewShowMore = this.handleReviewShowMore.bind(this);
    }

    componentWillMount() {
        this.loadDentistProfile();
    }

    async loadDentistProfile() {
        this.setState({ isFetching: true });
        this.dentist_id = this.props.match.params.id;
        let dentist = await this.props.loadDentistProfile(
            dentistQuery,
            this.dentist_id
        );
        document.title = `Laguro - Dr. ${dentist.user.name}`;
        this.setState({ isFetching: false });
    }

    handleReviewShowMore() {
        this.setState({
            reviewRowNum: this.state.reviewRowNum + 1
        });
    }

    componentDidUpdate() {
        const elements = document.getElementsByClassName('dropdown-trigger');
        for (const el of elements) {
            materialize.Dropdown.init(el, {
                coverTrigger: false,
                closeOnClick: false,
                constrainWidth: false
            });
        }
    }

    renderProcedures(dentist) {
        if (dentist) {
            return dentist.procedures.map(proc => (
                <div key={proc.name}>
                    {proc.name} - {proc.duration} minutes
                </div>
            ));
        }
        return <div>No procedures Available</div>;
    }

    handleBookAppointment = (
        selectedStartTime,
        durationToNextAppointment,
        selectedReservation
    ) => {
        this.setState({
            isModalOpen: true,
            selectedStartTime,
            durationToNextAppointment,
            selectedReservation
        });
    };

    closeModal = () => {
        this.setState({
            isModalOpen: false,
            selectedStartTime: null,
            durationToNextAppointment: null,
            selectedReservation: {}
        });
    };

    renderReservations() {
        const { auth, dentist } = this.props;

        if (dentist.reservations && dentist.reservations.length === 0) {
            return <div>Sorry no available appointment for now</div>;
        }
        return dentist.reservations.map((reservation, index) => {
            const office = reservation.office;
            const officeImage =
                office.imageUrls.length === 0 ? '' : office.imageUrls[0];
            return (
                <Grid key={index} item xs={6}>
                    <div className="reservation card-panel grey lighten-5">
                        <Link
                            className="blue-text text-darken-2"
                            to={`/office/${office.id}`}
                        >
                            <div className="office_detail">
                                <img src={officeImage} alt="" />
                                <h6>{office.name}</h6>
                            </div>
                        </Link>
                        <StyledResContentDiv className="content">
                            <div className="top-bar">
                                <p>
                                    {moment(reservation.startTime).format(
                                        'MMM D, h:mm a - '
                                    )}
                                    {moment(reservation.endTime).format(
                                        'h:mm a'
                                    )}
                                </p>
                            </div>
                            <div>
                                <Appointments
                                    reservation={reservation}
                                    auth={auth}
                                    dentist={dentist}
                                    onBookAppointment={
                                        this.handleBookAppointment
                                    }
                                />
                            </div>
                        </StyledResContentDiv>
                    </div>
                </Grid>
            );
        });
    }

    render() {
        const { dentist, auth } = this.props;
        const { isFetching } = this.state;
        if (isFetching) return <div className="stretch_height" />;

        // calculate avg rating
        if (dentist.reviews && dentist.reviews.length) {
            const dentistReviews = dentist.reviews.filter(
                review => review.reviewee_id === dentist.id
            );
            this.avg_rating =
                dentistReviews
                    .map(review => review.rating)
                    .reduce((acc, rating) => acc + rating, 0) /
                dentistReviews.length;
            this.rating_count = dentistReviews.length;
        } else {
            this.avg_rating = 0;
            this.rating_count = 0;
        }

        return (
            <div>
                <Padding bottomPerc={1.5} />

                <InfoDiv className="center">
                    <Link to={'/dentist/search'}>
                        <BackToListingsDiv>
                            <BackToListingsIcon
                                icon="backToListings"
                                width="45px"
                            />
                            <BackToListingsTextDiv>
                                {' '}
                                Back to dentist search{' '}
                            </BackToListingsTextDiv>
                        </BackToListingsDiv>
                    </Link>

                    <StyledProfPic
                        src={
                            dentist && dentist.user ? dentist.user.imageUrl : ''
                        }
                        alt="Profile Picture"
                    />

                    <NameDiv>
                        {dentist && dentist.user ? dentist.user.name : ''}
                    </NameDiv>
                </InfoDiv>

                <DetailsDiv>
                    <DetailsHeadingDiv>Procedures Available</DetailsHeadingDiv>

                    <hr />

                    <StaffEquipment>
                        <Padding bottomPerc="1" />
                        {this.renderProcedures(dentist)}
                    </StaffEquipment>

                    <Padding topPerc={5} />

                    <DetailsHeadingDiv>
                        Available Appointments
                    </DetailsHeadingDiv>

                    <hr />

                    <Grid container spacing={8}>
                        {this.renderReservations(dentist, auth)}
                    </Grid>

                    <Padding topPerc={5} />

                    <DetailsHeadingDiv>
                        Reviews ({dentist.reviews.length})
                    </DetailsHeadingDiv>

                    <StyledReactStars
                        count={5}
                        edit={false}
                        size={20}
                        value={this.avg_rating}
                    />

                    <hr />

                    <DentistReviewsDiv>
                        {auth ? (
                            <NewReview
                                reviewee={dentist}
                                type={DENTIST}
                                reviewerId={auth.id}
                            />
                        ) : (
                            <NewReview reviewee={dentist} type={DENTIST} />
                        )}

                        <Padding bottomPerc={2} />

                        <ReviewContainer
                            revieweeId={dentist.id}
                            revieweeName={
                                dentist && dentist.user ? dentist.user.name : ''
                            }
                            reviews={dentist.reviews}
                            rows={
                                this && this.state ? this.state.reviewRowNum : 1
                            }
                        />
                    </DentistReviewsDiv>

                    <ShowMore
                        className="center"
                        onClick={this.handleReviewShowMore}
                    >
                        <DownArrow icon="downArrow" width="20px" />
                        Show more
                    </ShowMore>
                </DetailsDiv>

                {this.state.selectedStartTime && (
                    <BookAppointment
                        open={this.state.isModalOpen}
                        closeModal={this.closeModal}
                        dentist={dentist}
                        startTime={this.state.selectedStartTime}
                        durationToNextAppointment={
                            this.state.durationToNextAppointment
                        }
                        reservation={this.state.selectedReservation}
                        auth={auth}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentist: state.dentists.selectedDentist
    };
}
export default connect(mapStateToProps, actions)(Dentist);
