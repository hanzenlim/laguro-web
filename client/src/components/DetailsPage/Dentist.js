import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as materialize from 'materialize-css/dist/js/materialize';
import {
    USER,
    OFFICES,
    LISTINGS,
    RESERVATIONS,
    REVIEWS
} from '../../util/strings';
import BookAppointment from '../forms/BookAppointment';
import * as actions from '../../actions';
import TopHalfInfo from './TopHalfInfo';
import DetailDetails from './DetailDetails';
import { Modal } from '../common';

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
                document.title = `Laguro - ${user ? user.name : ''}`;
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

    render() {
        const { dentist, auth, reviews, reservations } = this.props;

        return (
            <div>
                <TopHalfInfo type="dentist" obj={dentist} />

                <DetailDetails type="dentist" obj={dentist} reviews={reviews} reservations={reservations} auth={auth} />

                {this.state.selectedStartTime && (
                    <Modal closable open={this.state.isModalOpen} onClose={this.closeModal}>
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
        reviews: state.reviews.all
    };
}
export default connect(
    mapStateToProps,
    actions
)(Dentist);
