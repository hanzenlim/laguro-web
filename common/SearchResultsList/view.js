import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import _isEmpty from 'lodash/isEmpty';

import DentistListingCard from '../DentistListingCard';
import OfficeListingCard from '../OfficeListingCard';
import { Flex, Grid, Button } from '~/components';
import NoSearchResults from '../NoSearchResults';
import { DENTISTS, OFFICES } from '~/util/strings';
import { withRouter } from 'next/router';

const ITEMS_COUNT = 14;

class SearchResultsList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            urlParams: {},
            limit: ITEMS_COUNT,
            hasShowMore: false,
        };
    }

    componentDidMount() {
        this.setState({ urlParams: this.props.router.query });

        this.props.router.events.on('routeChangeStart', () => {
            this.urlParams = this.props.router.query;
            this.setState({ urlParams: this.urlParams });
        });

        if (
            this.props.total > ITEMS_COUNT &&
            !((this.urlParams && this.urlParams.limit) > this.props.total)
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

        // TODO: Add this back if you want to persist the state in URL
        // window.history.pushState('', '', `?${queryString.stringify(search)}`);

        this.props.onShowMore(limit);
        this.setState(() => ({ limit, hasShowMore: this.props.total > limit }));
    };

    handleRedirect = url => {
        this.props.router.push(url);
    };

    handleSelectAppointment = appointment => {
        const { localStartTime, dentistId, officeId } = appointment;

        let url = `/dentist/${dentistId}`;

        if (officeId && localStartTime) {
            url = `${url}?officeId=${officeId}&startTime=${localStartTime}`;
        }

        if (localStartTime && !officeId) {
            url = `${url}?startTime=${localStartTime}`;
        }

        if (officeId && !localStartTime) {
            url = `${url}?officeId=${officeId}`;
        }

        this.props.router.push(url);
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
                    gridColumnGap={10}
                    gridRowGap={isOffice ? [20, '', 10] : [10, '', 13]}
                    gridTemplateColumns={[
                        'none',
                        ...(isOffice && showMap
                            ? [
                                  'repeat(2, 1fr)',
                                  'repeat(2, minmax(200px, 1fr))',
                              ]
                            : []),
                        ...(isOffice && !showMap
                            ? ['repeat(2, 1fr)', 'none']
                            : []),
                    ]}
                >
                    {data.length
                        ? data
                              .slice(0, this.state.limit)
                              .map(item => (
                                  <Flex
                                      key={isOffice ? item.url : item.dentistId}
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

export default withRouter(SearchResultsList);
