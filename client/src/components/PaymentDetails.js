import React, { Component } from 'react';
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
                    <li>{reservation.startTime}</li>
                    <li>{reservation.endTime}</li>
                    <li>{reservation.location}</li>
                </div>
            );
        } else if (payment.type === APPOINTMENT_PAYMENT_TYPE && appointment) {
            itemInfo = (
                <div>
                    <li>{appointment.startTime}</li>
                    <li>{appointment.endTime}</li>
                    <li>{appointment.procedure.name}</li>
                    <li>{appointment.location}</li>
                </div>
            );
        }
        return (
            <div>
                <ul>
                    {itemInfo}
                    <li>{payment.type}</li>
                    <li>{source.last4}</li>
                    <li>{source.brand}</li>
                    <li>{payment.nominalAmount}</li>
                </ul>
            </div>
        );
    }
}

export default PaymentDetails;
