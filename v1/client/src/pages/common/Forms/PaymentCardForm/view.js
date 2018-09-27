import React from 'react';
import get from 'lodash/get';
import ExistingCardFormView from './ExistingCardForm';
import NewCardFormView from './NewCardForm';
import { Box, Button, Text } from '../../../../components';
import { NEW_CARD_PAYMENT_METHOD } from '../../../../util/strings';

const renderExistingCards = (
    paymentOptionsCards,
    selectedCard,
    onChangeCardSelect
) => (
    <Box my={10}>
        <ExistingCardFormView
            selectedCard={selectedCard}
            onChangeCardMethod={onChangeCardSelect}
            paymentOptionsCards={paymentOptionsCards}
        />
    </Box>
);

const CardView = ({
    isButtonOutside,
    paymentOptionsCards,
    selectedCard,
    btnText,
    handleSubmitExistingCard,
    handleSubmitNewCard,
    onChangeCardSelect,
    onBackButton,
}) => (
    <Box width="100%" position="relative">
        <Text fontSize={3} color="text.black" fontWeight="bold" mb={18}>
            Card Info
        </Text>

        <Box mb={28}>
            {get(paymentOptionsCards, 'length') > 0 &&
                renderExistingCards(
                    paymentOptionsCards,
                    selectedCard,
                    onChangeCardSelect
                )}

            {selectedCard === NEW_CARD_PAYMENT_METHOD && (
                <NewCardFormView
                    btnText={btnText}
                    handleSubmit={handleSubmitNewCard}
                    isButtonOutside={isButtonOutside}
                    onBackButton={onBackButton}
                />
            )}
        </Box>

        {selectedCard !== NEW_CARD_PAYMENT_METHOD &&
            onBackButton && (
                <Button
                    ghost={true}
                    height={55}
                    mb={10}
                    width={'100%'}
                    fontSize={2}
                    color="text.green"
                    onClick={onBackButton}
                >
                    Back
                </Button>
            )}
        {selectedCard !== NEW_CARD_PAYMENT_METHOD && (
            <Button
                width={'100%'}
                height={60}
                fontSize={3}
                px={14}
                onClick={handleSubmitExistingCard}
                style={
                    // Temporary solution before we can figure out
                    // how to connect an external button to a form
                    isButtonOutside
                        ? {
                              position: 'absolute',
                              width: '200px',
                              bottom: '-124px',
                              right: '-40px',
                          }
                        : {}
                }
            >
                {btnText}
            </Button>
        )}
    </Box>
);

export default CardView;
