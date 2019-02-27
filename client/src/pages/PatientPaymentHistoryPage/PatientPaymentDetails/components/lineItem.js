import React from 'react';

import { Flex, Text } from '../../../../components';
import { renderPrice } from '../../../../util/paymentUtil';

const LineItem = ({ quantity, name, price }) => (
    <Flex justifyContent="space-between">
        <Flex pr={10}>
            {quantity && (
                <Text
                    fontSize={[0, '', 3]}
                    fontWeight="bold"
                    color="text.black"
                >
                    {quantity}
                    &nbsp;
                </Text>
            )}
            <Text fontSize={[0, '', 3]} color="text.black">
                {name}
            </Text>
        </Flex>
        <Text fontSize={[0, '', 3]} fontWeight="bold" color="text.black">
            {renderPrice(price)}
        </Text>
    </Flex>
);

export default LineItem;
