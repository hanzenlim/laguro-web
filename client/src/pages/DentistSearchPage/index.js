import React, { Fragment, PureComponent } from 'react';
import { Query, compose, withApollo } from 'react-apollo';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import _get from 'lodash/get';
import DentistSearchPageView from './view';
import history from '../../history';
import { getMyPosition, DEFAULT_LOCATION } from '../../util/navigatorUtil';
import { GET_DENTISTS_AND_APPOINTMENT_SLOTS } from './queries';
import moment from 'moment';

import { appointmentClient } from '../../util/apolloClients';

const daysAvailabilityMapping = {
    'Any day': [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
    ],
    Monday: ['MONDAY'],
    Tuesday: ['TUESDAY'],
    Wednesday: ['WEDNESDAY'],
    Thursday: ['THURSDAY'],
    Friday: ['FRIDAY'],
    Saturday: ['SATURDAY'],
    Sunday: ['SUNDAY'],
    Weekdays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    Weekends: ['SATURDAY', 'SUNDAY'],
};

const getHoursFromTimeAvailability = {
    'ANY TIME': {
        startHour: '00:00:00',
        endHour: '23:00:00',
    },
    'EARLY MORNING': {
        startHour: '06:00:00',
        endHour: '09:00:00',
    },
    MORNING: {
        startHour: '08:00:00',
        endHour: '12:00:00',
    },
    LUNCH: {
        startHour: '12:00:00',
        endHour: '13:00:00',
    },
    'EARLY AFTERNOON': {
        startHour: '11:00:00',
        endHour: '15:00:00',
    },
    AFTERNOON: {
        startHour: '14:00:00',
        endHour: '17:00:00',
    },
    EVENING: {
        startHour: '14:00:00',
        endHour: '23:00:00',
    },
};

class DetailsSearchPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            total: 0,
            loading: true,
            showMap: false,
            defaultPosition: DEFAULT_LOCATION,
            urlParams: {},
            isFilterVisible: false,
            queryUrl: this.props.location.search,
        };

        this.refetch = () => {};
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
    };

    componentDidUpdate = async prevProps => {
        if (prevProps.location.search !== this.props.location.search) {
            const newUrlParams = queryString.parse(this.props.location.search);

            // Do not set loading to true if user clicked show more
            if (newUrlParams.limit) return;

            if (this.refetch) {
                const urlParams = queryString.parse(this.props.location.search);
                const queryParams = this.buildQueryParams(urlParams);
                this.refetch({
                    input: queryParams,
                });
            }
        }
    };

    toggleMap = () => {
        this.setState({ showMap: !this.state.showMap });
    };

    onToggleFilter = () => {
        this.setState({ isFilterVisible: !this.state.isFilterVisible });
    };

    buildQueryParams = urlParams => {
        let queryParams = {
            textQuery: urlParams && urlParams.text ? urlParams.text : '',
        };
        if (urlParams.lat && urlParams.long) {
            queryParams = {
                locationQuery: {
                    lat: parseFloat(urlParams.lat),
                    lon: parseFloat(urlParams.long),
                },
            };
        }

        queryParams.options = {};
        queryParams.options.rangeStart = moment()
            .add(1, 'days')
            .startOf('day')
            .utc()
            .format();
        queryParams.options.resultLimit = {
            numDays: 1,
        };

        // Add more filters
        if (
            urlParams.language ||
            urlParams.procedure ||
            urlParams.insurance ||
            urlParams.dayAvailability ||
            urlParams.timeAvailability
        ) {
            const options = {};

            if (urlParams.language && urlParams.language !== 'Any languages') {
                options.language = urlParams.language;
            }

            // We don't want to include the filter if the
            // selected procedure is all procedures
            if (
                urlParams.procedure &&
                urlParams.procedure !== 'All procedures'
            ) {
                options.procedure = urlParams.procedure;
            }

            if (
                urlParams.insurance &&
                urlParams.insurance !== 'All insurances'
            ) {
                if (urlParams.insurance === 'Delta Dental (CA)') {
                    options.acceptedInsurance = 'DD_CALIFORNIA';
                } else {
                    options.acceptedInsurance = urlParams.insurance;
                }
            }

            if (urlParams.dayAvailability) {
                options.days =
                    daysAvailabilityMapping[urlParams.dayAvailability];
            }

            if (urlParams.timeAvailability) {
                const { startHour, endHour } = getHoursFromTimeAvailability[
                    urlParams.timeAvailability.toUpperCase()
                ];
                options.timeRange = {
                    startHour,
                    endHour,
                };
            }

            queryParams.options = {
                ...queryParams.options,
                ...options,
            };

            return queryParams;
        }

        return queryParams;
    };

    render() {
        const urlParams = queryString.parse(this.props.location.search);
        const queryParams = this.buildQueryParams(urlParams);

        return (
            <Fragment>
                <Helmet>
                    <title>Search Dentist - Laguro</title>
                    <meta
                        name="description"
                        content="The Laguro Dentist Search tool can help you find a dentist that will best fit your needs"
                    />
                    <link
                        rel="canonical"
                        href="https://www.laguro.com/dentist/search"
                    />
                </Helmet>
                <Query
                    query={GET_DENTISTS_AND_APPOINTMENT_SLOTS}
                    client={appointmentClient}
                    fetchPolicy="network-only"
                    variables={{
                        input: queryParams,
                    }}
                    notifyOnNetworkStatusChange
                >
                    {({ data, loading, refetch }) => {
                        this.refetch = refetch;
                        const items = _get(
                            data,
                            'searchForDentistsAndAppointmentSlots',
                            []
                        );

                        return (
                            <DentistSearchPageView
                                data={items}
                                showMap={this.state.showMap}
                                total={items.length}
                                toggleMap={this.toggleMap}
                                defaultPosition={this.state.defaultPosition}
                                urlParams={this.state.urlParams}
                                loading={loading}
                                isFilterVisible={this.state.isFilterVisible}
                                onToggleFilter={this.onToggleFilter}
                            />
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default compose(withApollo)(DetailsSearchPage);
