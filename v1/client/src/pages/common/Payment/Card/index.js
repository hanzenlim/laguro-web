// CheckoutForm.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { injectStripe } from 'react-stripe-elements';
import { Query, graphql } from 'react-apollo';

import ExistingCardFormView from './ExistingCardFormView';
import { Box, Loading, Button } from '../../../../components';
import { NEW_CARD_PAYMENT_METHOD } from '../../../../util/strings';
import { getPaymentOptionQuery, addPaymentOptionMutation } from './queries';
import NewCardFormView from './NewCardFormView';

class CardForm extends Component {
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

    submitExistingCardPayment = () => {
        this.props.handleSubmit(this.state.selectedCard);
    };

    onCardSelectChange = value => {
        this.setState({
            selectedCard: get(value, 'target.value'),
        });
    };

    renderExistingCards(paymentOptionsCards, selectedCard) {
        return (
            <Box my={10}>
                <ExistingCardFormView
                    selectedCard={selectedCard}
                    onChangeCardMethod={this.onCardSelectChange}
                    paymentOptionsCards={paymentOptionsCards}
                />
            </Box>
        );
    }

    render() {
        const { userId } = this.props;
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
                        this.state.selectedCard === ''
                    ) {
                        const defaultCard = paymentOptionsCards.filter(
                            value => value.default === true
                        );

                        selectedCard = defaultCard[0].id;
                        // this.setState({
                        // selectedCard: defaultCard[0].id,
                        // });
                    }

                    // else if (this.state.selectedCard === '') {
                    //     this.setState({
                    //         selectedCard: NEW_CARD_PAYMENT_METHOD,
                    //     });
                    // }

                    return (
                        <Box width={'100%'}>
                            {get(paymentOptionsCards, 'length') > 0 &&
                                this.renderExistingCards(
                                    paymentOptionsCards,
                                    selectedCard
                                )}

                            {this.state.selectedCard ===
                                NEW_CARD_PAYMENT_METHOD && (
                                <NewCardFormView
                                    btnText={this.props.btnText}
                                    handleSubmit={this.handleCreateStripeToken}
                                />
                            )}

                            {selectedCard !== NEW_CARD_PAYMENT_METHOD && (
                                <Button
                                    width={'100%'}
                                    fontSize={2}
                                    onClick={this.submitExistingCardPayment}
                                >
                                    {this.props.btnText}
                                </Button>
                            )}
                        </Box>
                    );
                }}
            </Query>
        );
    }
}

CardForm.defaultProps = {
    btnText: 'Submit',
    userId: '',
    handleSubmit: () => {},
};

CardForm.propTypes = {
    btnText: PropTypes.string.isRequired,
    userId: PropTypes.string,
    handleSubmit: PropTypes.func,
};

export default graphql(addPaymentOptionMutation)(injectStripe(CardForm));
