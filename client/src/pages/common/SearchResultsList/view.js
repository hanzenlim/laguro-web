import React, { PureComponent } from 'react';
import queryString from 'query-string';

import DentistListingCard from '../DentistListingCard';
import history from '../../../history';
import { Flex, Text, Box, Grid, Button } from '../../../components';
import NoSearchResults from '../NoSearchResults';
import { DENTISTS, OFFICES } from '../../../util/strings';

const ITEMS_COUNT = 14;

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

    handleRedirect = url => {
        history.push(url);
    };

    handleSelectAppointment = (e, url) => {
        e.stopPropagation();
        const { start, address } = e.currentTarget.dataset;
        history.push(`${url}?startTime=${start}&address=${address}`);
    };

    render() {
        const { data, total, title, showMap } = this.props;
        const { urlParams } = this.state;
        const type = title === 'Office Results' ? OFFICES : DENTISTS;

        return (
            <Flex flexDirection="column">
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
                    gridTemplateColumns={['1fr']}
                >
                    {data.length
                        ? data.map(item => (
                              <Box key={item.url} width="100%">
                                  <DentistListingCard
                                      variant={showMap ? 'small' : 'large'}
                                      dentist={item}
                                      onRedirect={() =>
                                          this.handleRedirect(item.url)
                                      }
                                      onSelectAppointment={e =>
                                          this.handleSelectAppointment(
                                              e,
                                              item.url,
                                              item.startTime
                                          )
                                      }
                                  />
                              </Box>
                          ))
                        : null}
                </Grid>

                {total > ITEMS_COUNT &&
                !(this.state.urlParams.limit >= total) ? (
                    <Button mt={20} mb={45} onClick={this.showMore}>
                        Show more
                    </Button>
                ) : null}
            </Flex>
        );
    }
}

export default SearchResultsList;
