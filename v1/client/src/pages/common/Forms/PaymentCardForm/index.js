// CheckoutForm.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { injectStripe } from 'react-stripe-elements';
import { Query, graphql } from 'react-apollo';

import { Loading } from '../../../../components';
import { getPaymentOptionQuery, addPaymentOptionMutation } from './queries';
import PaymentCardFormView from './view';
import { RedirectErrorPage } from '../../../../pages/GeneralErrorPage';
import { NEW_CARD_PAYMENT_METHOD } from '../../../../util/strings';

class PaymentCardForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCard: '',
            stripeError: null,
        };
    }

    handleCreateStripeToken = async values => {
        if (this.props.checkIfVerified) {
            const isVerified = await this.props.checkIfVerified();

            if (!isVerified) {
                return null;
            }
        }

        if (this.props.updateSubmittingState) {
            await this.props.updateSubmittingState(true);
        }
        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        const { token, error } = await this.props.stripe.createToken({
            name: values.name,
            address_line1: values.address,
        });

        if (error) {
            this.props.updateSubmittingState(false);
            return this.setState({ stripeError: error });
        }

        const id = get(token, 'id');
        if (!token) {
            return null;
        }

        const result = await this.props.mutate({
            variables: {
                input: { userId: this.props.userId, paymentToken: id },
            },
        });

        const newCardId = get(result, 'data.addPaymentOption.id');
        if (newCardId) {
            this.props.handleSubmit(newCardId);
        } else {
            await this.props.updateSubmittingState(false);
        }

        return null;
    };

    onChangeCardSelect = value => {
        this.setState({
            selectedCard: get(value, 'target.value'),
        });
    };

    handleSubmitExistingCard = async selectedCard => {
        if (this.props.checkIfVerified) {
            const isVerified = await this.props.checkIfVerified();

            if (!isVerified) {
                return null;
            }
        }

        this.props.handleSubmit(selectedCard);
        return null;
    };

    render() {
        const { userId, btnText, isButtonOutside, isSubmitting } = this.props;
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
                        return <RedirectErrorPage />;
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
                                this.handleSubmitExistingCard(selectedCard)
                            }
                            handleSubmitNewCard={this.handleCreateStripeToken}
                            onChangeCardSelect={this.onChangeCardSelect}
                            onBackButton={this.props.onBackButton}
                            hasBackButton={this.props.hasBackButton}
                            stripeError={this.state.stripeError}
                            isSubmitting={isSubmitting}
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
    isSubmitting: false,
    updateSubmittingState: () => {},
};

PaymentCardForm.propTypes = {
    btnText: PropTypes.string.isRequired,
    userId: PropTypes.string,
    handleSubmit: PropTypes.func,
    updateSubmittingState: PropTypes.func,
    onBackButton: PropTypes.func,
    hasBackButton: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    checkIfVerified: PropTypes.func,
};

export default graphql(addPaymentOptionMutation)(injectStripe(PaymentCardForm));
