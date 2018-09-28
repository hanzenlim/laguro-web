import React from 'react';
import styled from 'styled-components';

import LinkCard from '../LinkCard';
import SearchPagination from '../SearchPagination';
import { Flex, Text, Box } from '../../../components';

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
    const { data, total } = props;

    return (
        <Flex width={['100%', '623px']} flexDirection="column">
            {data.length ? (
                <Text
                    fontSize={5}
                    color="text.black"
                    mb={10}
                    lineHeight="40px"
                    letterSpacing="-0.8px"
                >
                    find our highlights
                </Text>
            ) : (
                <Text fontSize={4} color="text.black">
                    No results, please start a new search.
                </Text>
            )}
            <StyledSearchResultsContainer>
                {data.length
                    ? data.map(item => (
                          <Box key={item.url} width="186px" mr="32px" mb="22px">
                              <LinkCard {...item} />
                          </Box>
                      ))
                    : null}
            </StyledSearchResultsContainer>
            <Flex justifyContent="flex-end">
                {total ? <SearchPagination total={total} /> : null}
            </Flex>
        </Flex>
    );
};

export default SearchResultsList;
