import React from 'react';

import { CheckMarkAnimation, Text, Box, Flex, Icon } from '../../../components';

const PaymentSuccessPageView = props => {
    const { h1, h2, h3 } = props;

    return (
        <div>
            <Text textAlign="center">
                <CheckMarkAnimation />
                <Flex
                    alignItems="center"
                    flexDirection="row"
                    height="100%"
                    justifyContent="center"
                >
                    <Box width="400px">
                        <Text fontSize={4} py={10} textTransform="uppercase">
                            {h1}
                        </Text>
                        <Text fontSize={5}>{h2}</Text>
                        <Flex
                            mt={5}
                            flexDirection="row"
                            justifyContent="center"
                        >
                            <Icon
                                type="locationPin"
                                width="20px"
                                height="20px"
                                color="icon.gray"
                                mx={5}
                            />
                            <Text color="text.green">{h3}</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Text>
        </div>
    );
};

export default PaymentSuccessPageView;
