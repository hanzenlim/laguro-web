import React, { Fragment, PureComponent } from 'react';
import { compose, withApollo } from 'react-apollo';
import { Helmet } from 'react-helmet';
import _throttle from 'lodash/throttle';
import _startCase from 'lodash/startCase';
import _toLower from 'lodash/toLower';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import _get from 'lodash/get';
import DentistSearchPageView from './view';
import history from '../../history';
import esClient from '../../util/esClient';
import { formatAddress } from '../../util/styleUtil';
import { DENTISTS } from '../../util/strings';
import { Loading, Box } from '../../components';
import { getMyPosition, DEFAULT_LOCATION } from '../../util/navigatorUtil';
import { numMaxContainerWidth } from '../../components/theme';
import { batchGetUsers } from './queries';
import moment from 'moment';

const PAGE_SIZE = 14;
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
            showMap: false,
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
        const total = this.getDataCount(response);

        const mappedData = this.getMappedData(response);
        await this.setState({
            data: mappedData,
            loading: false,
            total,
            urlParams,
        });

        const mappedDataWithTimeSlots = await this.addTimeSlots(
            mappedData,
            urlParams.startTime
        );
        this.setState({
            data: mappedDataWithTimeSlots,
        });

        this.updateDimensions();
        window.addEventListener('resize', _throttle(this.updateDimensions));
    };

    componentWillUnmount() {
        window.removeEventListener('resize', _throttle(this.updateDimensions));
    }

    onShowMore = async () => {
        const nextUrlParams = queryString.parse(this.props.location.search);
        const response = await this.fetchData(nextUrlParams);
        const total = this.getDataCount(response);

        const mappedData = this.getMappedData(response);
        await this.setState({
            data: mappedData,
            total,
            urlParams: nextUrlParams,
        });

        const mappedDataWithTimeSlots = await this.addTimeSlots(mappedData);
        await this.setState({ data: mappedDataWithTimeSlots });

        return true;
    };

    addTimeSlots = async (mappedData, startTime) => {
        const rangeStart = moment(startTime)
            .utc()
            .format();
        const rangeEnd = startTime
            ? moment(startTime)
                  .utc()
                  .endOf('day')
                  .format()
            : moment
                  .utc()
                  .add(28, 'days')
                  .endOf('day')
                  .format();
        const result = await this.props.client.query({
            query: batchGetUsers(rangeStart, rangeEnd),
            variables: {
                input: {
                    ids: mappedData.map(d => d.userId),
                },
            },
        });

        const timeSlots = [];
        result.data.batchGetUsers.forEach(user => {
            user.dentist.availableAppointmentSlots.forEach(timeSlot => {
                timeSlots.push(timeSlot);
            });
        });

        const mappedDataWithTimeSlots = [...mappedData];
        mappedData.forEach((data, index) =>
            data.reservations.forEach(reservation => {
                timeSlots.forEach(timeSlot => {
                    if (timeSlot.reservationId === reservation.id) {
                        mappedDataWithTimeSlots[index].availableTimes.push(
                            timeSlot
                        );
                    }
                });
            })
        );

        return mappedDataWithTimeSlots;
    };

    getDimensions = () => {
        const windowInnerWidth = window.innerWidth;
        const windowInnerHeight = window.innerHeight;
        const margins = windowInnerWidth - numMaxContainerWidth;
        const verticalOffset = 256;
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
                let reservations = [];

                if (
                    _isArray(source.reservations) &&
                    !_isEmpty(source.reservations)
                ) {
                    reservations = source.reservations.map(res => ({
                        ...res,
                        geoPoint: {
                            lat: res.geoPoint.lat + Math.random() / 100,
                            lon: res.geoPoint.lon + Math.random() / 100,
                        },
                    }));
                }

                return {
                    id: source.id,
                    userId: source.userId,
                    name: source.name,
                    rating: source.averageRating,
                    reviewCount: source.numReviews,
                    imageUrl: source.imageUrl,
                    reservations,
                    address: formatAddress(
                        _get(source, 'reservations[0].address'),
                        _get(source, 'reservations[0].addressDetails')
                    ),
                    insurance: _get(source, 'acceptedInsurances', []).map(i =>
                        _startCase(_toLower(i))
                    ),
                    longitude: _get(source, 'reservations[0].geoPoint.lon'),
                    latitude: _get(source, 'reservations[0].geoPoint.lat'),
                    specialty: source.specialty,
                    languages: _get(source, 'languages', []).map(l =>
                        _startCase(_toLower(l))
                    ),
                    procedures: _get(source, 'procedures', []).map(
                        p => p.group
                    ),
                    url: `/dentist/${item._id}`,
                    availableTimes: [],
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

    toggleMap = () => {
        this.setState({ showMap: !this.state.showMap });
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
                    showMap={this.state.showMap}
                    total={this.state.total}
                    toggleMap={this.toggleMap}
                    defaultPosition={this.state.defaultPosition}
                    urlParams={this.state.urlParams}
                    mapDimensions={this.state.mapDimensions}
                    onShowMore={this.onShowMore}
                />
            </Fragment>
        );
    }
}

export default compose(withApollo)(DetailsSearchPage);
