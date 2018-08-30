import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import { StripeProvider, Elements } from 'react-stripe-elements';

import { Box, Loading } from '../../components';
import { stripePublicKey } from '../../config/keys';
import CardForm from './Card';
import { getUserQuery } from '../common/Header/queries';

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

    submitPayment(cardId) {
        alert(`API call to payment with this card ${cardId}`);
    }

    render() {
        return (
            <Query query={getUserQuery}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        console.log('Error::', error);
                        return <div>Errorefwefwe</div>;
                    }

                    return (
                        <Box width="420px" pl={10} pr={10}>
                            <StripeProvider stripe={this.state.stripe}>
                                <Elements>
                                    <CardForm
                                        btnText="Make an appointment"
                                        userId={get(data, 'activeUser.id')}
                                        handleSubmit={this.submitPayment}
                                    />
                                </Elements>
                            </StripeProvider>
                        </Box>
                    );
                }}
            </Query>
        );
    }
}

export default Payment;
