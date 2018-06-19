import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';
import UserReservation from './UserReservation';

class UserReservationIndex extends Component {
    constructor(props) {
        super(props);
        this.cancelUserReservation = this.cancelUserReservation.bind(this);
    }

    async cancelUserReservation(reservationToCancel) {
        const { dentist } = this.props;
        // if owner rented his own office, remove reservation from nested office/listing/reservation table
        if (reservationToCancel.hostId === reservationToCancel.reservedBy.id) {
            // find the office this reservation is for
            let office = dentist.offices.find(
                office => office.id === reservationToCancel.office.id
            );
            // find the listing that the reservation belongs to
            let listing = office.listings.find(
                listing => listing.id === reservationToCancel.listingId
            );
            // remove reservation from that listing
            listing.reservations = listing.reservations.filter(
                reservation => reservation.id !== reservationToCancel.id
            );
        }
        // also remove reservation from dentist's list of reservations
        dentist.reservations = dentist.reservations.filter(
            res => res.id !== reservationToCancel.id
        );
        await this.props.cancelReservation(reservationToCancel.id);
        this.props.updateDentist(dentist);
    }

    render() {
        const { reservations } = this.props.dentist;

        if (!reservations || reservations.length === 0) {
            return (
                <div>
                    <h6>
                        {'No reservations yet - '}
                        <Link
                            className="blue-text text-darken-2"
                            to={'/office/search'}
                        >
                            search for new listings and make a reservation
                        </Link>
                    </h6>
                </div>
            );
        }

        let UserReservations = reservations.map(reservation => (
            <UserReservation
                key={reservation.id}
                reservation={reservation}
                cancelUserReservation={this.cancelUserReservation}
            />
        ));

        return <div>{UserReservations}</div>;
    }
}

function mapStateToProps(state) {
    return {
        dentist: state.dentists.selectedDentist
    };
}

export default connect(mapStateToProps, actions)(UserReservationIndex);
