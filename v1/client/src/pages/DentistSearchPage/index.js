import React, { PureComponent } from 'react';
import queryString from 'query-string';
import get from 'lodash/get';
import DentistSearchPageView from './view';
import esClient from '../../util/esClient';
import { DENTISTS } from '../../util/strings';
import { Loading } from '../../components';

const PAGE_SIZE = 9;
const DISTANCE = '100km';
const DEFAULT_LOCATION = {
    lon: -123.463,
    lat: 37.7648,
};

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
        const response = await this.fetchData(urlParams);
        const mappedData = this.getMappedData(response);
        const total = this.getDataCount(response);

        this.setState({ data: mappedData, total, loading: false });
    };

    componentDidUpdate = async prevProps => {
        if (prevProps.location.search !== this.props.location.search) {
            const nextUrlParams = queryString.parse(this.props.location.search);
            const response = await this.fetchData(nextUrlParams);
            const mappedData = this.getMappedData(response);
            const total = this.getDataCount(response);

            this.setState({ data: mappedData, total });
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
                    rating: 2.5,
                    image: 'http://via.placeholder.com/186x186',
                    address: get(source, 'availability[0].address'),
                    longitude: get(source, 'availability[0].geoPoint.lon'),
                    latitude: get(source, 'availability[0].geoPoint.lat'),
                    subtitle: source.specialty,
                    url: `/dentist/${item._id}`,
                };
            });
        }

        return mappedData;
    };

    getDataCount = data => data.hits.total;

    fetchData = async params => {
        const { endTime, startTime, lat, long: lon, page } = params;
        const from = this.getOffset(page, PAGE_SIZE);
        const filter = [];

        if (lat && lon) {
            filter.push({
                geo_distance: {
                    distance: DISTANCE,
                    'availability.geoPoint': {
                        lon: lon || DEFAULT_LOCATION.lon,
                        lat: lat || DEFAULT_LOCATION.lat,
                    },
                },
            });
        }

        if (startTime && endTime) {
            filter.push(
                {
                    range: {
                        'availability.endTime': {
                            gte: startTime,
                        },
                    },
                },
                {
                    range: {
                        'availability.startTime': {
                            lte: endTime,
                        },
                    },
                }
            );
        }

        const res = await esClient.search({
            index: DENTISTS,
            size: PAGE_SIZE,
            from,
            body: {
                query: {
                    bool: {
                        filter,
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
            />
        );
    }
}

export default DetailsSearchPage;
