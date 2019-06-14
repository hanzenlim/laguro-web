import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Text, Icon } from '../../../components';
import { FORM_LOADERS } from './';

const Loader = ({ step = '' }) => (
    <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mx="auto"
        width={234}
        height="100%"
    >
        <Icon
            fontSize={130}
            type={
                step === FORM_LOADERS.CALCULATING_PRICE
                    ? 'Calculate'
                    : 'Searching'
            }
        />
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
