import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import DentistListingCard from '../DentistListingCard';
import OfficeListingCard from '../OfficeListingCard';
import history from '../../../history';
import { Flex, Grid, Button } from '../../../components';
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
            hasShowMore: false,
        };
    }

    componentDidMount() {
        history.listen(location => {
            this.urlParams = queryString.parse(location.search);
            this.setState({ urlParams: this.urlParams });
        });

        if (
            this.props.total > ITEMS_COUNT &&
            !(this.urlParams.limit >= this.props.total)
        ) {
            this.setState({ hasShowMore: true });
        }
    }

    showMore = async () => {
        const limit = this.state.limit + ITEMS_COUNT;
        const search = {
            ...this.urlParams,
            limit,
        };

        history.push({
            search: queryString.stringify(search),
        });

        this.setState(() => ({ limit, hasShowMore: this.props.total > limit }));
    };

    handleRedirect = url => {
        history.push(url);
    };

    handleSelectAppointment = appointment => {
        const { localStartTime, dentistId } = appointment;
        const url = `/dentist/${dentistId}`;

        history.push(
            localStartTime ? `${url}?startTime=${localStartTime}` : url
        );
    };

    render() {
        const { data, title, showMap } = this.props;
        const { urlParams } = this.state;
        const isOffice = title === 'Office Results';
        const type = isOffice ? OFFICES : DENTISTS;

        return (
            <Flex flexDirection="column" mb={[0, '20px', '']}>
                {!data.length && (
                    <NoSearchResults
                        location={urlParams.location}
                        text={urlParams.text}
                        type={type}
                    />
                )}

                <Grid
                    gridColumnGap="17px"
                    gridRowGap={[10, 11, 13]}
                    gridTemplateColumns={
                        // eslint-disable-next-line
                        showMap && isOffice
                            ? [
                                  'repeat(auto-fit, minmax(300px, 1fr))',
                                  'repeat(auto-fit, minmax(200px, 1fr))',
                              ]
                            : isOffice
                            ? [
                                  'repeat(auto-fit, minmax(300px, 1fr))',
                                  'repeat(auto-fit, minmax(250px, 1fr))',
                                  '1fr',
                              ]
                            : ['1fr']
                    }
                >
                    {data.length
                        ? data.slice(0, this.state.limit).map(item => (
                              <Flex
                                  key={isOffice ? item.url : item.dentistId}
                                  width={
                                      data.length === 1 && isOffice && showMap
                                          ? ['100%', '50%']
                                          : '100%'
                                  }
                              >
                                  {isOffice ? (
                                      <OfficeListingCard
                                          office={item}
                                          showMap={showMap}
                                          onRedirect={() =>
                                              this.handleRedirect(item.url)
                                          }
                                      />
                                  ) : (
                                      <DentistListingCard
                                          variant="large"
                                          dentist={item}
                                          showMap={showMap}
                                          onRedirect={() =>
                                              this.handleRedirect(
                                                  item.dentistId
                                              )
                                          }
                                          onSelectAppointment={e =>
                                              this.handleSelectAppointment(
                                                  e,
                                                  item.url,
                                                  item.startTime
                                              )
                                          }
                                      />
                                  )}
                              </Flex>
                          ))
                        : null}
                </Grid>

                {this.state.hasShowMore ? (
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                    >
                        <Button
                            mt={20}
                            onClick={this.showMore}
                            width={327}
                            height={51}
                        >
                            Show more
                        </Button>
                    </Flex>
                ) : null}
            </Flex>
        );
    }
}

SearchResultsList.propTypes = {
    data: PropTypes.array,
    // Toggle size of image in search results list
    showMap: PropTypes.bool,
    total: PropTypes.number,
};

export default SearchResultsList;
