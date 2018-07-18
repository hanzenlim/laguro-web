import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
    USER,
    OFFICES,
    LISTINGS,
    RESERVATIONS,
    REVIEWS,
    APPOINTMENTS
} from '../../util/strings';
import BookAppointment from '../forms/BookAppointment';
import * as actions from '../../actions';
import TopHalfInfo from './TopHalfInfo';
import LoginModal from '../LoginModal';
import { Modal } from '../common';
//eslint-disable-next-line
import DetailDetails from './DetailDetails';

class Dentist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            selectedStartTime: null,
            durationToNextAppointment: null,
            showReservationOptions: false,
            selectedReservation: {}
        };

        this.handleBookAppointment = this.handleBookAppointment.bind(this);
    }

    componentWillMount() {
        this.dentist_id = this.props.match.params.id;
        this.props
            .getDentist(
                this.dentist_id,
                USER,
                OFFICES,
                LISTINGS,
                RESERVATIONS,
                REVIEWS
            )
            .then(() => {
                const user =
                    this.props.dentist && this.props.dentist.user
                        ? this.props.dentist.user
                        : null;
                document.title = `Laguro - ${
                    user ? `${user.firstName} ${user.lastName}` : ''
                }`;
            });

        const { auth } = this.props;
        if (auth) {
            this.setState({ isAppointmentLoading: true });
            this.props.fetchUser(auth.googleId, APPOINTMENTS).then(() => {
                this.setState({ isAppointmentLoading: false });
            });
        }
    }

    // check if user has had an appointment before, or has one currently with this dentist
    isUserVerified = () => {
        if (this.state.isAppointmentLoading) {
            return false;
        }

        const { appointments } = this.props;
        if (appointments) {
            for (let appt of appointments) {
                if (
                    appt &&
                    appt.dentist &&
                    appt.dentist.id === this.dentist_id
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    handleBookAppointment(
        selectedStartTime,
        durationToNextAppointment,
        selectedReservation
    ) {
        this.setState({
            isModalOpen: true,
            showReservationOptions: true,
            selectedStartTime,
            durationToNextAppointment,
            selectedReservation
        });
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
            selectedStartTime: null,
            durationToNextAppointment: null,
            selectedReservation: {}
        });
    };

    render() {
        const { dentist, auth, reviews, reservations } = this.props;

        return (
            <div>
                <TopHalfInfo type="dentist" obj={dentist} />

                <DetailDetails
                    type="dentist"
                    obj={dentist}
                    reviews={reviews}
                    reservations={reservations}
                    auth={auth}
                    handleBookAppointment={this.handleBookAppointment}
                    ownPage={auth && dentist && auth.dentistId === dentist.id}
                    isUserVerified={this.isUserVerified()}
                />

                {this.state.selectedStartTime && auth ? (
                    <Modal
                        closable
                        open={this.state.isModalOpen}
                        closeModal={this.closeModal}
                    >
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
                    </Modal>
                ) : (
                    <LoginModal
                        open={this.state.isModalOpen}
                        closeModal={this.closeModal}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentist: state.dentists.selectedDentist,
        listings: state.listings.all,
        reservations: state.reservations.all,
        appointments: isEmpty(state.appointments.selected)
            ? null
            : state.appointments.selected,
        reviews: state.reviews.all
    };
}
export default connect(mapStateToProps, actions)(Dentist);
