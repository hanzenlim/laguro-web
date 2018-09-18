// CheckoutForm.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { injectStripe } from 'react-stripe-elements';
import { Query, graphql } from 'react-apollo';

import { Loading } from '../../../../components';
import { getPaymentOptionQuery, addPaymentOptionMutation } from './queries';
import PaymentCardFormView from './view';
import { NEW_CARD_PAYMENT_METHOD } from '../../../../util/strings';

class PaymentCardForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCard: '',
        };
    }

    handleCreateStripeToken = async values => {
        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        const stripeToken = await this.props.stripe.createToken({
            name: values.name,
            address_line1: values.address,
        });

        const id = get(stripeToken, 'token.id');

        if (!id) {
            return;
        }

        const result = await this.props.mutate({
            variables: {
                input: { userId: this.props.userId, paymentToken: id },
            },
        });

        const newCardId = get(result, 'data.addPaymentOption.id');
        if (newCardId) {
            this.props.handleSubmit(newCardId);
        }
    };

    onChangeCardSelect = value => {
        this.setState({
            selectedCard: get(value, 'target.value'),
        });
    };

    render() {
        const { userId, btnText, isButtonOutside } = this.props;
        const isSkipped = !userId;

        return (
            <Query
                query={getPaymentOptionQuery}
                variables={{ id: userId }}
                skip={isSkipped}
            >
                {({ loading, error, data }) => {
                    // Loading evaluates to true even if the skip is set to true so
                    // we have to check if it's not skipped here.
                    if (loading && !isSkipped) {
                        return <Loading />;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    const paymentOptionsCards = get(
                        data,
                        'getUser.paymentOptions'
                    );

                    let { selectedCard } = this.state;

                    // Check if you have an existing card and user has not
                    // interacted with the radio group.
                    if (
                        get(paymentOptionsCards, 'length') > 0 &&
                        selectedCard === ''
                    ) {
                        const defaultCard = paymentOptionsCards.filter(
                            value => value.default === true
                        );

                        selectedCard = defaultCard[0].id;
                    } else if (selectedCard === '') {
                        selectedCard = NEW_CARD_PAYMENT_METHOD;
                    }

                    return (
                        <PaymentCardFormView
                            paymentOptionsCards={paymentOptionsCards}
                            selectedCard={selectedCard}
                            btnText={btnText}
                            isButtonOutside={isButtonOutside}
                            handleSubmitExistingCard={() =>
                                this.props.handleSubmit(selectedCard)
                            }
                            handleSubmitNewCard={this.handleCreateStripeToken}
                            onChangeCardSelect={this.onChangeCardSelect}
                            onBackButton={this.props.onBackButton}
                        />
                    );
                }}
            </Query>
        );
    }
}

PaymentCardForm.defaultProps = {
    btnText: 'Submit',
    userId: '',
    handleSubmit: () => {},
};

PaymentCardForm.propTypes = {
    btnText: PropTypes.string.isRequired,
    userId: PropTypes.string,
    handleSubmit: PropTypes.func,
    onBackButton: PropTypes.func,
};

export default graphql(addPaymentOptionMutation)(injectStripe(PaymentCardForm));
