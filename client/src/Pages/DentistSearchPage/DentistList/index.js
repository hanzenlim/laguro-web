import React from 'react';
import styled from 'styled-components';

import DentistCard from '../DentistCard';
import { Pagination, Flex, Text, Box } from '../../../components';

const StyledDentistList = styled(Flex)`
    width: 100%;
    flex-wrap: wrap;

    > *:nth-child(3n) {
        @media screen and (min-width: 1200px) {
            margin-right: 0;
        }
    }
`;

const DentistList = () => (
    <Box width={['100%', '623px']}>
        <Text
            fontSize={4}
            color="text.black"
            mb={10}
            lineHeight="40px"
            letterSpacing="-0.8px"
        >
            find our highlights
        </Text>
        <StyledDentistList>
            <Box width="186px" mr={16} mb={11}>
                <DentistCard />
            </Box>
            <Box width="186px" mr={16} mb={11}>
                <DentistCard />
            </Box>
            <Box width="186px" mr={16} mb={11}>
                <DentistCard />
            </Box>
            <Box width="186px" mr={16} mb={11}>
                <DentistCard />
            </Box>
            <Box width="186px" mr={16} mb={11}>
                <DentistCard />
            </Box>
            <Box width="186px" mr={16} mb={11}>
                <DentistCard />
            </Box>
            <Box width="186px" mr={16} mb={11}>
                <DentistCard />
            </Box>
        </StyledDentistList>
        <Flex justifyContent="flex-end">
            <Pagination />
        </Flex>
    </Box>
);

export default DentistList;
