import React from 'react';

import { Flex, Image, Text } from '../../../../components';
import visa from '../../../../components/Image/visa.svg';
import mastercard from '../../../../components/Image/mastercard.svg';
import americanExpress from '../../../../components/Image/americanExpress.svg';
import discover from '../../../../components/Image/discover.svg';
import whiteLogo from '../../../../components/Image/whiteLogo.svg';

const CreditCard = ({ brand, last4 }) => {
    const creditCardImg = () => {
        switch (brand) {
            case 'Visa':
                return visa;
            case 'Mastercard':
                return mastercard;
            case 'American Express':
                return americanExpress;
            case 'Discover':
                return discover;
            default:
                return whiteLogo;
        }
    };

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            height={[30, '', 50]}
            width={[80, '', 130]}
            border="1px solid"
            borderRadius="2px"
            borderColor="divider.darkGray"
        >
            <Image
                src={creditCardImg()}
                height={[16, '', 20]}
                width={[22, '', 30]}
            />
            <Text fontSize={[0, '', 2]} fontWeight="bold" color="text.black">
                {` •••• ${last4}`}
            </Text>
        </Flex>
    );
};

export default CreditCard;
