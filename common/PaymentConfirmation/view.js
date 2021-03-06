import React from 'react';
import PropTypes from 'prop-types';

import { CheckMarkAnimation, Text, Box, Flex, Icon } from '~/components';

const PaymentConfirmationView = props => {
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
                    <Box width={['100%', '', '400px']}>
                        <Text
                            fontSize={[2, '', 4]}
                            py={10}
                            textTransform="uppercase"
                        >
                            {h1}
                        </Text>
                        <Text fontSize={[3, '', 5]}>{h2}</Text>
                        {h3 ? (
                            <Flex
                                mt={5}
                                flexDirection="row"
                                justifyContent="center"
                            >
                                <Icon
                                    type="locationPin"
                                    width="20px"
                                    height="20px"
                                    color="icon.lightGray"
                                    mx={5}
                                />
                                <Text color="text.blue">{h3}</Text>
                            </Flex>
                        ) : null}
                    </Box>
                </Flex>
            </Text>
        </div>
    );
};

PaymentConfirmationView.propTypes = {
    h1: PropTypes.string,
    h2: PropTypes.string,
    h3: PropTypes.string,
};

PaymentConfirmationView.defaultProps = {
    h1: 'Your booking is confirmed',
    h2: 'Tuesday, August 28, 2018 , 5:30pm',
    h3: '535 Mission St. San Francisco, CA 94116',
};

export default PaymentConfirmationView;
