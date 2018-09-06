import React from 'react';
import get from 'lodash/get';
import ExistingCardFormView from './ExistingCardForm';
import NewCardFormView from './NewCardForm';
import { Box, Button } from '../../../../components';
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
    <Box width={'100%'}>
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
                fontSize={2}
                onClick={handleSubmitExistingCard}
            >
                {btnText}
            </Button>
        )}
    </Box>
);

export default CardView;
