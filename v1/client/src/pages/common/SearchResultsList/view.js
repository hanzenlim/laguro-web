import React, { PureComponent } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';

import LinkCard from '../LinkCard';
import SearchPagination from '../SearchPagination';
import history from '../../../history';
import { Flex, Text, Box } from '../../../components';
import NoSearchResults from '../NoSearchResults';
import { DENTISTS, OFFICES } from '../../../util/strings';

const StyledSearchResultsContainer = styled(Flex)`
    width: 100%;
    flex-wrap: wrap;
    flex: 1;
    align-content: start;
`;

class SearchResultsList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            urlParams: queryString.parse(history.location.search),
        };
        history.listen(location => {
            const urlParams = queryString.parse(location.search);
            this.setState({ urlParams });
        });
    }

    render() {
        const { data, total, title } = this.props;
        const { urlParams } = this.state;
        const type = title === 'Office Results' ? OFFICES : DENTISTS;

        return (
            <Flex width="55%" flexDirection="column">
                {data.length > 0 ? (
                    <Text
                        fontSize={5}
                        color="text.black"
                        mb={10}
                        lineHeight="40px"
                        letterSpacing="-0.8px"
                    >
                        {title}
                    </Text>
                ) : (
                    <NoSearchResults
                        location={urlParams.location}
                        text={urlParams.text}
                        type={type}
                    />
                )}
                <StyledSearchResultsContainer>
                    {data.length
                        ? data.map(item => (
                              <Box
                                  key={item.url}
                                  width="186px"
                                  mr="24px"
                                  mb="22px"
                              >
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
    }
}

export default SearchResultsList;
