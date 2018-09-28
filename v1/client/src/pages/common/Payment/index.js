import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import { Loading } from '../../../components';
import { stripePublicKey } from '../../../config/keys';
import { getUserQuery } from '../../common/Header/queries';
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
            document
                .querySelector('#stripe-js')
                .addEventListener('load', () => {
                    this.setState({ stripe: window.Stripe(stripePublicKey) });
                });
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
        const { btnText, isButtonOutside } = this.props;

        return (
            <Query query={getUserQuery}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <div>Error.....</div>;
                    }

                    return (
                        <PaymentView
                            stripe={this.state.stripe}
                            btnText={btnText}
                            isButtonOutside={isButtonOutside}
                            userId={get(data, 'activeUser.id')}
                            handleSubmit={this.submitPayment}
                            onBackButton={this.onBackButton}
                        />
                    );
                }}
            </Query>
        );
    }
}

Payment.defaultProps = {
    onPay: () => {},
    onBackButton: () => {},
};

Payment.PropTypes = {
    onPay: PropTypes.func.isRequired,
    onBackButton: PropTypes.func.isRequired,
    btnText: PropTypes.string.isRequired,
};

export default Payment;
