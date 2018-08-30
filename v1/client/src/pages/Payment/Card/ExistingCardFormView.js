import React from 'react';
import { Box, Text, Image, Flex, Radio } from '../../../components';
import visa from '../../../components/Image/visa.svg';
import mastercard from '../../../components/Image/mastercard.svg';
import defaultPaymentcard from '../../../components/Image/defaultCardPayment.svg';

const RadioGroup = Radio.Group;

const NEW_CARD_METHOD = 'new_card_method';

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
        <span>
            <Image
                display={'inline-block'}
                mt={-4}
                mr={9}
                width="22px"
                height="14px"
                src={source()}
                alt="hero1"
            />
        </span>
    );
};

const ExistingCardFormView = ({
    selectedCard,
    onChangeCardMethod,
    paymentOptionsCards,
}) => (
    <RadioGroup onChange={onChangeCardMethod} value={selectedCard}>
        {paymentOptionsCards.map(card => (
            <Flex flexDirection="row" flex="1">
                <Radio value={card.id} className="baho">
                    <Flex
                        display="inline-flex"
                        justifyContent="space-between"
                        height={32}
                        pl={8}
                        borderRadius={4}
                        border={'1px solid #c8c7c7'}
                        width={'100%'}
                    >
                        <Box ml={8}>•••••••••••• {card.last4}</Box>
                        <Box ml={10}>
                            <Text display={'inline-block'} mr={14}>
                                exp: {card.exp_month}/{card.exp_year % 100}
                            </Text>
                            {getCardLogo(card.brand)}
                        </Box>
                    </Flex>
                </Radio>
            </Flex>
        ))}

        <Radio value={NEW_CARD_METHOD}>Add a new card</Radio>
    </RadioGroup>
);

export default ExistingCardFormView;
