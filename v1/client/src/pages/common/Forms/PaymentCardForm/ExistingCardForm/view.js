import React from 'react';
import { Box, Text, Image, Flex, Radio } from '../../../../../components';
import visa from '../../../../../components/Image/visa.svg';
import mastercard from '../../../../../components/Image/mastercard.svg';
import defaultPaymentcard from '../../../../../components/Image/defaultCardPayment.svg';
import { NEW_CARD_PAYMENT_METHOD } from '../../../../../util/strings';

const RadioGroup = Radio.Group;
const cardLogoMapping = {
    MasterCard: () => mastercard,
    Visa: () => visa,
    Default: () => defaultPaymentcard,
};
const getCardLogo = brand => {
    let source = cardLogoMapping[brand];

    if (!source) {
        source = cardLogoMapping.Default;
    }

    return (
        <Image
            display="inline-block"
            mt={-4}
            mr={9}
            width="22px"
            height="14px"
            src={source()}
            alt={brand}
        />
    );
};

const ExistingCardFormView = ({
    selectedCard,
    onChangeCardMethod,
    paymentOptionsCards,
}) => (
    <RadioGroup onChange={onChangeCardMethod} value={selectedCard}>
        {paymentOptionsCards.map(card => (
            <Flex flexDirection="row" flex="1" key={card.id}>
                <Radio value={card.id}>
                    <Flex
                        display="inline-flex"
                        justifyContent="space-between"
                        height={32}
                        pl={8}
                        borderRadius={4}
                        border="1px solid"
                        borderColor="divider.gray"
                        width="100%"
                    >
                        <Box ml={8}>•••••••••••• {card.last4}</Box>
                        <Box ml={10}>
                            <Text display={'inline-block'} mr={14}>
                                {card.exp_month}/{card.exp_year % 100}
                            </Text>
                            {getCardLogo(card.brand)}
                        </Box>
                    </Flex>
                </Radio>
            </Flex>
        ))}

        <Radio value={NEW_CARD_PAYMENT_METHOD}>Add a new card</Radio>
    </RadioGroup>
);

export default ExistingCardFormView;
