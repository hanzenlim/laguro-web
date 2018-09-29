import React, { PureComponent } from 'react';
import queryString from 'query-string';
import get from 'lodash/get';
import DentistSearchPageView from './view';
import esClient from '../../util/esClient';
import { DENTISTS } from '../../util/strings';
import { Loading } from '../../components';
import { getMyPosition } from '../../util/navigatorUtil';

const PAGE_SIZE = 9;
const DISTANCE = '100km';
// most documents are standardized around 1
// having this boost prioritizes location/data filter over prefix matching
// on fields such as name, bio, specialty, etc.
const FILTER_BOOST = 5;

class DetailsSearchPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            total: 0,
            loading: true,
        };
    }

    componentDidMount = async () => {
        const urlParams = queryString.parse(this.props.location.search);
        const [response, defaultPosition] = await Promise.all([
            this.fetchData(urlParams),
            getMyPosition(),
        ]);
        const mappedData = this.getMappedData(response);
        const total = this.getDataCount(response);

        this.defaultPosition = defaultPosition;

        this.setState({ data: mappedData, total, loading: false, urlParams });
    };

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

    getOffset = (page, pageSize) => {
        if (!page) return 0;

        let offset = page - 1;

        if (page > 1) {
            offset *= pageSize + 1;
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
                    image: 'http://via.placeholder.com/186x186',
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
        const { endTime, startTime, lat, long: lon, page, text } = params;
        const from = this.getOffset(page, PAGE_SIZE);
        const should = [];
        const filter = [];

        if (text) {
            should.push({
                multi_match: {
                    query: text,
                    type: 'phrase_prefix',
                    fields: [
                        // the carrot syntax multiplies the score of the result
                        'name^2',
                        'specialty',
                        'procedures.name',
                        'location.name',
                    ],
                },
            });
        } else if (lat && lon) {
            filter.push({
                geo_distance: {
                    distance: DISTANCE,
                    'reservations.geoPoint': {
                        lon: lon || this.defaultPosition.lon,
                        lat: lat || this.defaultPosition.lat,
                    },
                },
            });
        }

        if (startTime && endTime) {
            filter.push(
                {
                    range: {
                        'reservations.availableTimes.endTime': {
                            gte: startTime,
                        },
                    },
                },
                {
                    range: {
                        'reservations.availableTimes.startTime': {
                            lte: endTime,
                        },
                    },
                }
            );
        }

        if (filter.length > 0) {
            should.push({
                bool: {
                    must: [
                        filter.map(f => ({
                            constant_score: {
                                filter: f,
                                boost: FILTER_BOOST,
                            },
                        })),
                    ],
                },
            });
        }

        const res = await esClient.search({
            index: DENTISTS,
            size: PAGE_SIZE,
            from,
            body: {
                query: {
                    bool: {
                        should,
                    },
                },
            },
        });

        return res;
    };

    render() {
        if (this.state.loading) return <Loading />;

        return (
            <DentistSearchPageView
                data={this.state.data}
                total={this.state.total}
                defaultPosition={this.defaultPosition}
                urlParams={this.state.urlParams}
            />
        );
    }
}

export default DetailsSearchPage;
