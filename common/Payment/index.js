import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getUser } from '~/util/authUtils';
import { stripePublicKey } from '../../keys';
import PaymentView from './view';

class Payment extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            stripe: null,
        };
    }

    componentDidMount() {
        // https://github.com/stripe/react-stripe-elements#loading-stripejs-asynchronously
        if (window.Stripe) {
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({ stripe: window.Stripe(stripePublicKey) });
        } else {
            const script = document.createElement("script");
            script.src = "https://js.stripe.com/v3/";
            script.async = true;
            script.id = "stripe-js";
            script.addEventListener('load', () => {
                this.setState({ stripe: window.Stripe(stripePublicKey) });
            });
            document.body.appendChild(script);
        }
    }

    submitPayment = cardId => {
        if (this.props.onSuccess) {
            this.props.onSuccess(cardId);
        }

        this.props.onPay(cardId);
    };

    onBackButton = () => {
        this.props.onBackButton();
    };

    render() {
        const {
            btnText,
            isButtonOutside,
            hasBackButton,
            isSubmitting,
            updateSubmittingState,
            checkIfVerified,
        } = this.props;

        const user = getUser();

        return (
            <PaymentView
                stripe={this.state.stripe}
                btnText={btnText}
                isButtonOutside={isButtonOutside}
                userId={get(user, 'id')}
                handleSubmit={this.submitPayment}
                onBackButton={this.onBackButton}
                hasBackButton={hasBackButton}
                isSubmitting={isSubmitting}
                updateSubmittingState={updateSubmittingState}
                checkIfVerified={checkIfVerified}
                isInPatientDashboard={this.props.isInPatientDashboard}
            />
        );
    }
}

Payment.defaultProps = {
    onPay: () => {},
    onBackButton: () => {},
    hasBackButton: false,
    isSubmitting: false,
};

Payment.propTypes = {
    onPay: PropTypes.func.isRequired,
    onBackButton: PropTypes.func.isRequired,
    btnText: PropTypes.string.isRequired,
    hasBackButton: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default Payment;
