import React, { PureComponent } from 'react';
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
        alert(`API call to payment with this card ${cardId}`);

        if (this.props.onSuccess) {
            this.props.onSuccess(cardId);
        }
    };

    render() {
        return (
            <Query query={getUserQuery}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    return (
                        <PaymentView
                            stripe={this.state.stripe}
                            btnText="Make an appointment"
                            userId={get(data, 'activeUser.id')}
                            handleSubmit={this.submitPayment}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default Payment;
