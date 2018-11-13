import React, { PureComponent } from 'react';
import queryString from 'query-string';

import LinkCard from '../LinkCard';
import SearchPagination from '../SearchPagination';
import history from '../../../history';
import { Flex, Text, Box, Grid, Responsive, Button } from '../../../components';
import NoSearchResults from '../NoSearchResults';
import { DENTISTS, OFFICES } from '../../../util/strings';

const { Desktop, TabletMobile } = Responsive;

const ITEMS_COUNT = 8;

class SearchResultsList extends PureComponent {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);
        this.state = {
            urlParams: this.urlParams,
            limit: ITEMS_COUNT,
        };
    }

    componentDidMount() {
        history.listen(location => {
            this.urlParams = queryString.parse(location.search);
            this.setState({ urlParams: this.urlParams });
        });
    }

    showMore = () => {
        const limit = this.state.limit + ITEMS_COUNT;

        this.setState({ limit });

        const search = {
            ...this.urlParams,
            limit,
        };

        history.push({
            search: queryString.stringify(search),
        });
    };

    render() {
        const { data, total, title } = this.props;
        const { urlParams } = this.state;
        const type = title === 'Office Results' ? OFFICES : DENTISTS;

        return (
            <Flex flexDirection="column" pb={[100, '', 0]}>
                {data.length > 0 ? (
                    <Text
                        fontSize={[1, '', 5]}
                        fontWeight="medium"
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
                <Grid
                    gridColumnGap="17px"
                    gridRowGap="20px"
                    gridTemplateColumns={['1fr 1fr', '', '1fr 1fr 1fr']}
                >
                    {data.length
                        ? data.map(item => (
                              <Box key={item.url} width="100%">
                                  <LinkCard {...item} />
                              </Box>
                          ))
                        : null}
                </Grid>

                {total > ITEMS_COUNT &&
                !(this.state.urlParams.limit >= total) ? (
                    <TabletMobile>
                        <Button mt={20} mb={45} onClick={this.showMore}>
                            Show more
                        </Button>
                    </TabletMobile>
                ) : null}

                <Desktop>
                    <Flex justifyContent="flex-end" mb="100px">
                        {total && total > 1 ? (
                            <SearchPagination total={total} />
                        ) : null}
                    </Flex>
                </Desktop>
            </Flex>
        );
    }
}

export default SearchResultsList;
