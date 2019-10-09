import React, { PureComponent, Fragment } from 'react';
import _throttle from 'lodash/throttle';
import _flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import { withRouter } from 'next/router';

import OfficeSearchPageView from './view';
import esClient from '~/lib/esClient';
import { Loading, Box } from '~/components';
import { withScreenSizes } from '~/components/Responsive';
import { numMaxContainerWidth } from '~/components/theme';
import { getMyPosition, DEFAULT_LOCATION } from '~/util/navigatorUtil';
import { OFFICES } from '~/util/strings';
import { trimAddress } from '~/util/styleUtil';

const PAGE_SIZE = 14;
const DISTANCE = '75km';

class OfficeSearchPage extends PureComponent {
    constructor(props) {
        super(props);

        const { esData } = this.props;

        this.state = {
            data: this.getMappedData(esData),
            total: this.getDataCount(esData),
            loading: true,
            showMap: this.props.desktopOnly,
            mapDimensions: {
                width: 0,
                height: 0,
            },
        };
    }

    componentDidMount = async () => {
        this.updateDimensions();
        window.addEventListener('resize', _throttle(this.updateDimensions));

        this.setState({
            loading: false,
        });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', _throttle(this.updateDimensions));
    }

    updateSearchResults = async limit => {
        const urlParams = this.props.router.query;
        const response = await this.fetchData({ limit, ...urlParams });
        const mappedData = this.getMappedData(response);
        const total = this.getDataCount(response);

        this.setState({
            data: mappedData,
            total,
        });
    };

    getDimensions = () => {
        const windowInnerWidth = window.innerWidth;
        const windowInnerHeight = window.innerHeight;
        const margins = windowInnerWidth - numMaxContainerWidth;
        const verticalOffset = 180;
        const horizontalOffset = 18;

        return {
            width:
                windowInnerWidth < numMaxContainerWidth
                    ? windowInnerWidth / 2.22 - horizontalOffset
                    : (windowInnerWidth - margins) / 2.22 - horizontalOffset,
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
                    id: item._id,
                    title: source.name,
                    rating: source.averageRating,
                    image: source.imageUrls[0],
                    address: trimAddress(get(source, 'location.name')),
                    longitude: get(source, 'location.geoPoint.lon'),
                    latitude: get(source, 'location.geoPoint.lat'),
                    subtitle: source.description,
                    url: `/office/${
                        source.permalink ? source.permalink : item._id
                    }`,
                    equipment: source.equipment,
                    numReviews: source.numReviews,
                };
            });
        }

        return mappedData;
    };

    getDataCount = data => data.hits.total;

    fetchData = async params => {
        const { lat, long: lon, page, text, limit } = params;
        const from = this.getOffset(page, PAGE_SIZE);
        const must = [
            {
                term: { isVerified: { value: true } },
            },
        ];

        let distanceFilter = null;

        if (text) {
            // do not prefix match on document fields if location is specified
            must.push({
                multi_match: {
                    query: text,
                    type: 'phrase_prefix',
                    fields: [
                        // the carrot syntax multiplies the score of the result
                        'name^2',
                        'location.name',
                        'equipment.name',
                    ],
                },
            });
        } else {
            distanceFilter = {
                geo_distance: {
                    distance: DISTANCE,
                    'location.geoPoint': {
                        lon: lon || DEFAULT_LOCATION.lon,
                        lat: lat || DEFAULT_LOCATION.lat,
                    },
                },
            };
        }

        const res = await esClient.search({
            index: OFFICES,
            size: limit || PAGE_SIZE,
            from,
            body: {
                sort: [{ dateCreated: { order: 'asc' } }],
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
        this.setState(state => ({ showMap: !state.showMap }));
    };

    onSearchNearLocation = async () => {
        const { router } = this.props;
        const defaultPosition = await getMyPosition();

        router.push({
            pathname: '/office/search',
            query: { lat: defaultPosition.lat, long: defaultPosition.lon },
        });
    };

    render() {
        if (this.state.loading)
            return (
                <Box pt={[48, '', 160]}>
                    <Loading />
                </Box>
            );

        const { router } = this.props;
        const { data, total, mapDimensions, showMap } = this.state;

        const defaultPosition =
            router.query.lat && router.query.long
                ? { lat: router.query.lat, lon: router.query.long }
                : DEFAULT_LOCATION;

        return (
            <Fragment>
                <OfficeSearchPageView
                    defaultPosition={defaultPosition}
                    data={data}
                    total={total}
                    urlParams={router.query}
                    mapDimensions={mapDimensions}
                    showMap={showMap}
                    toggleMap={this.toggleMap}
                    onShowMore={this.updateSearchResults}
                />
                {process.env.REACT_APP_ENV === 'development' && (
                    <button
                        onClick={this.onSearchNearLocation}
                        style={{ position: 'fixed', bottom: 15, left: 15 }}
                    >
                        Find offices near me
                    </button>
                )}
            </Fragment>
        );
    }
}

export default _flowRight(withScreenSizes, withRouter)(OfficeSearchPage);
