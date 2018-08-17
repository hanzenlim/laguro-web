import React from 'react';
import styled from 'styled-components';

import DentistCard from '../DentistCard';
import { Pagination, Flex, Text, Box } from '../../../components';

const StyledDentistList = styled(Flex)`
    width: 100%;
    flex-wrap: wrap;
    flex: 1;
    align-content: start;

    > *:nth-child(3n) {
        @media screen and (min-width: 1200px) {
            margin-right: 0;
        }
    }
`;

const DentistList = () => (
    <Flex width={['100%', '623px']} flexDirection="column">
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
            <Box width="186px" mr="32px" mb="22px">
                <DentistCard />
            </Box>
            <Box width="186px" mr="32px" mb="22px">
                <DentistCard />
            </Box>
            <Box width="186px" mr="32px" mb="22px">
                <DentistCard />
            </Box>
            <Box width="186px" mr="32px" mb="22px">
                <DentistCard />
            </Box>
            <Box width="186px" mr="32px" mb="22px">
                <DentistCard />
            </Box>
            <Box width="186px" mr="32px" mb="22px">
                <DentistCard />
            </Box>
        </StyledDentistList>
        <Flex justifyContent="flex-end">
            <Pagination />
        </Flex>
    </Flex>
);

export default DentistList;
