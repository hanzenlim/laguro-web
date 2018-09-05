import React, { PureComponent } from 'react';
import PaymentSuccessPageView from './view';

class PaymentConfirmation extends PureComponent {
    render() {
        return (
            <PaymentSuccessPageView
                h1="Your booking is confirmed"
                h2="Tuesday, August 28, 2018 , 5:30pm"
                h3="535 Mission St. San Francisco, CA 94116"
            />
        );
    }
}

export default PaymentConfirmation;
