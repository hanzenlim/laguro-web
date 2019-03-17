import React, { Fragment, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import _throttle from 'lodash/throttle';
import queryString from 'query-string';
import get from 'lodash/get';
import OfficeSearchPageView from './view';
import history from '../../history';
import esClient from '../../util/esClient';
import { OFFICES } from '../../util/strings';
import { Loading, Box } from '../../components';
import { getMyPosition, DEFAULT_LOCATION } from '../../util/navigatorUtil';
import { numMaxContainerWidth } from '../../components/theme';
import { formatAddress } from '../../util/styleUtil';

const PAGE_SIZE = 9;
const DISTANCE = '75km';

class OfficeSearchPage extends PureComponent {
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
            urlParams: null,
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
                    address: formatAddress(
                        get(source, 'location.name'),
                        get(source, 'location.addressDetails')
                    ),
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
                <Helmet>
                    <title>
                        {this.state.urlParams.location
                            ? `${
                                  this.state.urlParams.location
                              } | Offices | Laguro`
                            : 'Laguro'}
                    </title>
                    <meta
                        name="description"
                        content="Search for your next dental office in your current location."
                    />
                    <link
                        rel="canonical"
                        href="https://www.laguro.com/office/search"
                    />
                </Helmet>
                <OfficeSearchPageView
                    defaultPosition={this.state.defaultPosition}
                    data={this.state.data}
                    total={this.state.total}
                    urlParams={this.state.urlParams}
                    mapDimensions={this.state.mapDimensions}
                    showMap={this.state.showMap}
                    toggleMap={this.toggleMap}
                />
            </Fragment>
        );
    }
}

export default OfficeSearchPage;
