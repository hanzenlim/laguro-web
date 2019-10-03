// CheckoutForm.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { injectStripe } from 'react-stripe-elements';
import { Query, graphql } from 'react-apollo';
import { notification } from 'antd';

import { Loading } from '~/components';
import { getPaymentOptionQuery, addPaymentOptionMutation } from './queries';
import PaymentCardFormView from './view';
import { RedirectErrorPage } from '~/routes/GeneralErrorPage';
import { NEW_CARD_PAYMENT_METHOD } from '~/util/strings';

class PaymentCardForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCard: '',
            errorMessage: null,
            // used to wait on creating new stripe token for payment methods in patient dashboard
            isCreatingStripeToken: false,
        };
    }

    // eslint-disable-next-line
    handleCreateStripeToken = async values => {
        this.setState({
            isCreatingStripeToken: true,
        });

        if (this.props.checkIfVerified) {
            const isVerified = await this.props.checkIfVerified();

            if (!isVerified) {
                this.setState({
                    isCreatingStripeToken: false,
                });
                return null;
            }
        }

        if (this.props.updateSubmittingState) {
            await this.props.updateSubmittingState(true);
        }
        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        const { token, error } = await this.props.stripe.createToken({});

        if (error) {
            this.props.updateSubmittingState(false);

            this.handleStripeError(error);

            return this.setState({
                isCreatingStripeToken: false,
            });
        }

        const id = get(token, 'id');
        if (!token) {
            this.setState({
                isCreatingStripeToken: false,
            });
            return null;
        }

        try {
            const result = await this.props.mutate({
                variables: {
                    input: { userId: this.props.userId, paymentToken: id },
                },
            });
            const newCardId = get(result, 'data.addPaymentOption.id');
            if (newCardId) {
                this.props.handleSubmit(newCardId);
            }
            // this is to hide new card form after creating a new stripe token for payment methods in patient dashboard
            if (this.props.isInPatientDashboard) {
                this.setState({
                    selectedCard: null,
                });
            }
        } catch (err) {
            this.handleStripeError(err);
        }

        this.setState({
            isCreatingStripeToken: false,
        });

        return null;
    };

    handleStripeError = error => {
        if (
            error.message ===
            'GraphQL error: Treatment plan payment is not authorized'
        ) {
            notification.error({
                message: 'Not authorized',
                description:
                    'The pin code entered was not correct. Please verify with your patient that you have the correct code and try again.',
                duration: 8,
            });
        } else if (error.message === 'GraphQL error: Your card was declined.') {
            notification.error({
                message: 'Card declined',
                description:
                    'Unfortunately your credit card was declined and your payment is unable to be processed. Please check your card and try again.',
                duration: 8,
            });
        } else if (
            error.message === 'GraphQL error: Your card has insufficient funds.'
        ) {
            notification.error({
                message: 'Insufficient funds',
                description:
                    'Unfortunately this credit card does not have enough funds for this payment. Please enter a new card and try again.',
                duration: 8,
            });
        } else {
            notification.error({
                message: 'Payment failed',
                description:
                    'Unfortunately processing this payment failed. Please verify your card number and try again',
                duration: 8,
            });
        }
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
                fetchPolicy="network-only"
            >
                {({ loading, error, data, refetch }) => {
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
                    } else if (
                        selectedCard === '' &&
                        !this.props.isInPatientDashboard
                    ) {
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
                            handleSubmitNewCard={async () => {
                                await this.handleCreateStripeToken();
                                // in order to show new existing cards after new card has been created
                                if (this.props.isInPatientDashboard) {
                                    refetch();
                                }
                            }}
                            onChangeCardSelect={this.onChangeCardSelect}
                            onBackButton={this.props.onBackButton}
                            hasBackButton={this.props.hasBackButton}
                            errorMessage={this.state.errorMessage}
                            isSubmitting={isSubmitting}
                            isInPatientDashboard={
                                this.props.isInPatientDashboard
                            }
                            // used to wait on creating new stripe token for payment methods in patient dashboard
                            isCreatingStripeToken={
                                this.state.isCreatingStripeToken
                            }
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
