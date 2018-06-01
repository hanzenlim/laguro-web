import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserReservation from './UserReservation';
import * as actions from '../actions';
import { RESERVED_BY } from '../util/strings';

class UserReservationIndex extends Component {
    constructor(props) {
        super(props);
        this.cancelReservation = this.cancelReservation.bind(this);
    }

    async cancelReservation(reservation) {
        await this.props.cancelReservation(reservation.id);
        await this.props.queryReservations(RESERVED_BY, this.props.dentist.id);
    }

    render() {
        const { reservations } = this.props;

        if (!reservations) {
            return;
        }
        if (reservations.length === 0) {
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
                cancelReservation={this.cancelReservation}
            />
        ));

        return <div>{UserReservations}</div>;
    }
}

export default connect(null, actions)(UserReservationIndex);
