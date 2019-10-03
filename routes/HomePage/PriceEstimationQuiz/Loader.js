import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { transparentize } from 'polished';

import { Box, Flex, Text, Icon } from '~/components';

import { FORM_LOADERS } from './';

// Animations
const rotate = keyframes`
	from {
        transform: rotate(0deg) translateX(15px) rotate(0deg);
    }
	to {
        transform: rotate(360deg) translateX(15px) rotate(-360deg);
    }
`;

const pulse = keyframes`
	0% {
        box-shadow: 0 0 0 0 ${transparentize(0.4, '#d3d3d3')};
    }
    70% {
        box-shadow: 0 0 0 40px ${transparentize(1, '#d3d3d3')};
    }
    100% {
        box-shadow: 0 0 0 0 ${transparentize(1, '#d3d3d3')};
    }
`;

const AnimatedIcon = styled(Icon)`
    &:not(svg) {
        height: 130px;
        border-radius: 50%;
        animation: ${({ type }) => (type === 'Searching' ? rotate : pulse)} 2s
            linear infinite;
    }
`;

const Loader = ({ step = '' }) => (
    <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mx="auto"
        width={234}
        height="100%"
    >
        <AnimatedIcon
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
