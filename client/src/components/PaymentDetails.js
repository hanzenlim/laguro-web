import React, { Component } from 'react';
import moment from 'moment';
import {
    RESERVATION_PAYMENT_TYPE,
    APPOINTMENT_PAYMENT_TYPE
} from '../util/strings';

class PaymentDetails extends Component {
    render() {
        const { payment } = this.props;
        const { source } = payment.stripePayment;
        const { reservation, appointment } = payment;
        let itemInfo = '';
        if (payment.type === RESERVATION_PAYMENT_TYPE && reservation) {
            itemInfo = (
                <div>
                    Payment for Reservation
                    <li>
                        {moment(reservation.startTime).format(
                            'MMM DD h:mm a - '
                        ) + moment(reservation.endTime).format('h:mm a')}
                    </li>
                    <li>{reservation.location}</li>
                </div>
            );
        } else if (payment.type === APPOINTMENT_PAYMENT_TYPE && appointment) {
            itemInfo = (
                <div>
                    Payment for Appointment
                    <li>
                        {moment(appointment.startTime).format(
                            'MMM DD h:mm a - '
                        ) + moment(appointment.endTime).format('h:mm a')}
                    </li>
                    <li>{appointment.procedure.name}</li>
                    <li>{appointment.location}</li>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="reservation card-panel gray lighten-5 col s6">
                    <div className="align-left">{itemInfo}</div>
                    <div className="align-right">
                        <p>{`${source.brand} - ${source.last4}`}</p>
                        <p>{`$${(payment.nominalAmount / 100).toFixed(2)}`}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentDetails;
