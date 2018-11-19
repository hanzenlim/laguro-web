import React, { Fragment, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import _throttle from 'lodash/throttle';
import queryString from 'query-string';
import get from 'lodash/get';
import DentistSearchPageView from './view';
import history from '../../history';
import esClient from '../../util/esClient';
import { DENTISTS } from '../../util/strings';
import { Loading, Box } from '../../components';
import { getMyPosition, DEFAULT_LOCATION } from '../../util/navigatorUtil';
import { numMaxContainerWidth } from '../../components/theme';

const PAGE_SIZE = 9;
const DISTANCE = '75km';

// ignore timezone-related characters in timestamp
const TIME_PRECISION = 19;

class DetailsSearchPage extends PureComponent {
    constructor(props) {
        super(props);

        const { width, height } = this.getDimensions();

        this.state = {
            data: [],
            total: 0,
            loading: true,
            defaultPosition: DEFAULT_LOCATION,
            mapDimensions: {
                width,
                height,
            },
        };
    }

    componentDidMount = async () => {
        const urlParams = queryString.parse(this.props.location.search);
        // TODO: Handle case where a desktop user at page 2 of search page
        // shares his current URL to a mobile user
        if (urlParams.limit) {
            delete urlParams.limit;
            history.push({ search: `?${queryString.stringify(urlParams)}` });
        }

        if (!urlParams.lat || !urlParams.long) {
            this.setState({ defaultPosition: await getMyPosition() });
        }
        const response = await this.fetchData(urlParams);
        const mappedData = this.getMappedData(response);
        const total = this.getDataCount(response);

        this.updateDimensions();
        window.addEventListener('resize', _throttle(this.updateDimensions));

        this.setState({
            data: mappedData,
            total,
            loading: false,
            urlParams,
        });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', _throttle(this.updateDimensions));
    }

    componentDidUpdate = async prevProps => {
        if (prevProps.location.search !== this.props.location.search) {
            const nextUrlParams = queryString.parse(this.props.location.search);
            const response = await this.fetchData(nextUrlParams);
            const mappedData = this.getMappedData(response);
            const total = this.getDataCount(response);

            this.setState({
                data: mappedData,
                total,
                urlParams: nextUrlParams,
            });
        }
    };

    getDimensions = () => {
        const windowInnerWidth = window.innerWidth;
        const windowInnerHeight = window.innerHeight;
        const margins = windowInnerWidth - numMaxContainerWidth;
        const verticalOffset = 180;
        const horizontalOffset = 41.5;

        return {
            width:
                windowInnerWidth < numMaxContainerWidth
                    ? windowInnerWidth / 2 - horizontalOffset
                    : (windowInnerWidth - margins) / 2 - horizontalOffset,
            height: windowInnerHeight - verticalOffset,
        };
    };

    updateDimensions = () => {
        const { width, height } = this.getDimensions();

        this.setState({
            mapDimensions: {
                width,
                height,
            },
        });
    };

    getOffset = (page, pageSize) => {
        if (!page) return 0;

        let offset = page - 1;

        if (page > 1) {
            offset *= pageSize;
        }

        return offset;
    };

    getMappedData = data => {
        let mappedData = [];

        if (data.hits.hits.length > 0) {
            mappedData = data.hits.hits.map(item => {
                const source = item._source;
                return {
                    title: source.name,
                    rating: source.averageRating,
                    image: source.imageUrl,
                    reservations: get(source, 'reservations'),
                    address: get(source, 'reservations[0].address'),
                    longitude: get(source, 'reservations[0].geoPoint.lon'),
                    latitude: get(source, 'reservations[0].geoPoint.lat'),
                    subtitle: source.specialty,
                    url: `/dentist/${item._id}`,
                };
            });
        }

        return mappedData;
    };

    getDataCount = data => data.hits.total;

    fetchData = async params => {
        const {
            endTime,
            startTime,
            lat,
            long: lon,
            page,
            text,
            limit,
        } = params;
        const from = this.getOffset(page, PAGE_SIZE);
        const { defaultPosition } = this.state;
        // must in the elasticsearch context
        // see https://www.elastic.co/guide/en/elasticsearch/reference/6.3/query-dsl-bool-query.html
        const must = [
            {
                term: { isVerified: { value: true } },
            },
        ];
        let distanceFilter = null;

        if (text) {
            must.push({
                multi_match: {
                    query: text,
                    type: 'phrase_prefix',
                    fields: [
                        // the carrot syntax multiplies the score of the result
                        'name^2',
                        'specialty',
                        'procedures.name',
                        'reservations.address',
                    ],
                },
            });
        } else {
            distanceFilter = {
                geo_distance: {
                    distance: DISTANCE,
                    'reservations.geoPoint': {
                        lon: lon || defaultPosition.lon,
                        lat: lat || defaultPosition.lat,
                    },
                },
            };
        }

        if (startTime && endTime) {
            must.push(
                {
                    range: {
                        'reservations.availableTimes.endTime': {
                            gte: startTime.substring(0, TIME_PRECISION),
                        },
                    },
                },
                {
                    range: {
                        'reservations.availableTimes.startTime': {
                            lte: endTime.substring(0, TIME_PRECISION),
                        },
                    },
                }
            );
        }

        const res = await esClient.search({
            index: DENTISTS,
            size: limit || PAGE_SIZE,
            from,
            body: {
                query: {
                    bool: {
                        must,
                        filter: distanceFilter,
                    },
                },
            },
        });

        return res;
    };

    render() {
        if (this.state.loading)
            return (
                <Box pt={[48, '', 160]}>
                    <Loading />
                </Box>
            );

        return (
            <Fragment>
                <Helmet>
                    <title>
                        {this.state.urlParams.location
                            ? `${
                                  this.state.urlParams.location
                              } | Dentists | Laguro`
                            : 'Laguro'}
                    </title>
                    <meta
                        name="description"
                        content="Search for your next dentist with Laguro and start your treatments today."
                    />
                    <link
                        rel="canonical"
                        href="https://www.laguro.com/dentist/search"
                    />
                </Helmet>

                <DentistSearchPageView
                    data={this.state.data}
                    total={this.state.total}
                    defaultPosition={this.state.defaultPosition}
                    urlParams={this.state.urlParams}
                    mapDimensions={this.state.mapDimensions}
                />
            </Fragment>
        );
    }
}

export default DetailsSearchPage;
