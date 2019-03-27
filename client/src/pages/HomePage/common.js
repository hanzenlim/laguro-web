import React from 'react';
import { Box, Flex, Text } from '../../components';

export const SectionHeading = props => (
    <Flex justifyContent="center" opacity={0.8} mb={[40, 20, 55]}>
        <Box>
            <Text
                fontWeight="bold"
                fontSize={[4, '', 5]}
                textAlign="center"
                letterSpacing="-0.66px"
                lineHeight="36px"
            >
                {props.heading}
            </Text>
            <Box
                mx={9}
                mt={10}
                borderBottom="solid 3px"
                borderColor="divider.blue"
            />
        </Box>
    </Flex>
);
