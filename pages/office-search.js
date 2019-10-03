import React, { Fragment, PureComponent } from 'react';
import Head from 'next/head';
import _throttle from 'lodash/throttle';
import _flowRight from 'lodash/flowRight';
import queryString from 'query-string';
import get from 'lodash/get';
import OfficeSearchPageView from '../routes/OfficeSearchPage/view';
// import history from '~/util/history';
import { Router, withRouter } from 'next/router';

import esClient from '~/lib/esClient';
import { OFFICES } from '../util/strings';
import { Loading, Box } from '~/components';
import { withScreenSizes } from '../components/Responsive';
import { getMyPosition, DEFAULT_LOCATION } from '../util/navigatorUtil';
import { numMaxContainerWidth } from '../components/theme';
import { trimAddress } from '../util/styleUtil';

const PAGE_SIZE = 14;
const DISTANCE = '75km';

class OfficeSearchPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            total: 0,
            loading: true,
            showMap: this.props.desktopOnly,
            defaultPosition: DEFAULT_LOCATION,
            mapDimensions: {
                width: 0,
                height: 0,
            },
            urlParams: null,
        };
    }

    componentDidMount = async () => {
        const urlParams = this.props.router.query;

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
        // const { location, tabletMobileOnly } = this.props;
        // const { showMap } = this.state;
        // if (prevProps.location.search !== location.search) {
        //     const newUrlParams = queryString.parse(location.search);
        //     if (!newUrlParams.limit) this.setState(() => ({ loading: true }));
        //     await this.updateSearchResults();
        //     if (!newUrlParams.limit) this.setState(() => ({ loading: false }));
        // }
        // if (tabletMobileOnly && showMap) {
        //     this.setState({ showMap: false });
        // }
    };

    updateSearchResults = async limit => {
        const nextUrlParams = this.props.router.query;
        const response = await this.fetchData({ limit, ...nextUrlParams });
        const mappedData = this.getMappedData(response);
        const total = this.getDataCount(response);

        this.setState({
            data: mappedData,
            total,
            urlParams: nextUrlParams,
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
                    url: `/office/${item._id}`,
                    equipment: source.equipment,
                    numReviews: source.numReviews,
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
        const must = [
            {
                term: { isVerified: { value: true } },
            },
        ];
        const { defaultPosition } = this.state;

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
                        'listings.endTime': {
                            gte: startTime,
                        },
                    },
                },
                {
                    range: {
                        'listings.startTime': {
                            lte: endTime,
                        },
                    },
                }
            );
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

    render() {
        if (this.state.loading)
            return (
                <Box pt={[48, '', 160]}>
                    <Loading />
                </Box>
            );

        return (
            <Fragment>
                <Head>
                    <title>Search Office - Laguro</title>
                    <meta
                        name="description"
                        content="Searching for your next dental office is now available at the touch of your fingertip"
                    />
                    <link
                        rel="canonical"
                        href="https://www.laguro.com/office/search"
                    />
                </Head>
                <OfficeSearchPageView
                    defaultPosition={this.state.defaultPosition}
                    data={this.state.data}
                    total={this.state.total}
                    urlParams={this.state.urlParams}
                    mapDimensions={this.state.mapDimensions}
                    showMap={this.state.showMap}
                    toggleMap={this.toggleMap}
                    onShowMore={this.updateSearchResults}
                />
            </Fragment>
        );
    }
}

export default _flowRight(withScreenSizes, withRouter)(OfficeSearchPage);
