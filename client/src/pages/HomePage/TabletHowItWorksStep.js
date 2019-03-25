import React from 'react';
import { Box, Flex, Text } from '../../components/index';
import { APPLE_SD_GOTHIC_NEO } from '../../components/theme';

export const TabletHowItWorksStep = ({ num, title, description }) => (
    <Box position="relative" height={200}>
        <Flex position="absolute" justifyContent="center" width="100%">
            <Text
                width="100%"
                color="#245197"
                lineHeight="1"
                fontSize={[200, 200, 380]}
                fontWeight="bold"
                opacity={(num + 2) / 100}
                textAlign="right"
            >
                {num}
            </Text>
        </Flex>
        <Box bg="transparent" mt={90}>
            <Flex mb={12} alignItems="flex-end" fontSize={26} height="3em">
                <Text
                    width="60%"
                    color="#245197"
                    fontWeight="bold"
                    letterSpacing="-0.7px"
                >
                    {title}
                </Text>
            </Flex>
            <Text
                color="#234374"
                fontFamily={APPLE_SD_GOTHIC_NEO}
                fontSize={2}
                lineHeight="24px"
            >
                {description}
            </Text>
        </Box>
    </Box>
);
