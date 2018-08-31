import React from 'react';
import styled from 'styled-components';

import LinkCard from '../LinkCard';
import { Pagination, Flex, Text, Box } from '../../../components';

const StyledSearchResultsContainer = styled(Flex)`
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

const SearchResultsList = props => {
    const { data } = props;

    return (
        <Flex width={['100%', '623px']} flexDirection="column">
            <Text
                fontSize={5}
                color="text.black"
                mb={10}
                lineHeight="40px"
                letterSpacing="-0.8px"
            >
                find our highlights
            </Text>
            <StyledSearchResultsContainer>
                {data &&
                    data.map(item => (
                        <Box width="186px" mr="32px" mb="22px">
                            <LinkCard {...item} />
                        </Box>
                    ))}
            </StyledSearchResultsContainer>
            <Flex justifyContent="flex-end">
                <Pagination />
            </Flex>
        </Flex>
    );
};

export default SearchResultsList;
