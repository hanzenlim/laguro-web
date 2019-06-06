import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Text } from '../../../components';

const Loader = ({ step = '' }) => (
    <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mx="auto"
        width={234}
        height="100%"
    >
        <Box width={130} height={130} bg="background.gray" borderRadius="50%" />
        <Box mt={28}>
            <Text fontWeight="bold" fontSize={3}>
                Hang on tight!
            </Text>
            <Text fontWeight="bold" fontSize={3}>
                {step}
            </Text>
        </Box>
    </Flex>
);

Loader.propTypes = {
    step: PropTypes.string.isRequired,
};

export default Loader;
