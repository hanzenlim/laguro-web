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
    paymentOptionsCards,
    selectedCard,
    btnText,
    handleSubmitExistingCard,
    handleSubmitNewCard,
    onChangeCardSelect,
}) => (
    <Box width="100%" mt={38}>
        <Text fontSize={3} color="text.black" fontWeight="bold" mb={18}>
            Card Info
        </Text>
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
            />
        )}

        {selectedCard !== NEW_CARD_PAYMENT_METHOD && (
            <Button
                width={'100%'}
                height={60}
                fontSize={3}
                px={14}
                mt={28}
                onClick={handleSubmitExistingCard}
            >
                {btnText}
            </Button>
        )}
    </Box>
);

export default CardView;
