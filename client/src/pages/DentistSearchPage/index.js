import React, { Fragment, PureComponent } from 'react';
import { Query, compose, withApollo } from 'react-apollo';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';

import DentistSearchPageView from './view';
import history from '../../history';
import { GET_DENTISTS_AND_APPOINTMENT_SLOTS } from './queries';
import { supportedInsuranceList } from '../../staticData';
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

export const sortByList = [
    { desc: 'Best matches', value: '' },
    { desc: 'Most popular', value: 'numReviews' },
    { desc: 'Name', value: 'name' },
];

const procedureListMapping = {
    'First Visit': ['Exams'],
    'General procedures': ['Fillings', 'Crowns/Bridges/Venners'],
    Surgery: [
        'Root Canals',
        'Gum Surgery/Grafting',
        'Implant placement',
        'Implant crown',
        'Extractions/Surgery',
    ],
    'Special treatment': [
        'Deep Cleaning',
        'Whitening/Cosmetic',
        'Dentures',
        'Braces',
    ],
};

class DetailsSearchPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isFilterVisible: false,
            sortBy: sortByList[0].value,
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

    onToggleFilter = () => {
        this.setState({ isFilterVisible: !this.state.isFilterVisible });
    };

    setSortBy = value => this.setState({ sortBy: value });

    sortItems = (items, sortBy) => {
        if (sortBy === 'name') {
            return _sortBy(items, item => item[sortBy]);
        }

        if (sortBy === 'numReviews') {
            return _sortBy(items, item => item[sortBy]).reverse();
        }

        return items;
    };

    buildQueryParams = urlParams => {
        const queryParams = {
            textQuery: urlParams && urlParams.text ? urlParams.text : '',
        };

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
            urlParams.bundleGroup ||
            urlParams.insuranceProvider ||
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
                urlParams.bundleGroup &&
                urlParams.bundleGroup !== 'All procedures'
            ) {
                options.procedures =
                    procedureListMapping[urlParams.bundleGroup];
            }

            if (
                urlParams.insuranceProvider &&
                urlParams.insuranceProvider !== 'All insurances' &&
                supportedInsuranceList
                    .map(i => i.id)
                    .includes(urlParams.insuranceProvider)
            ) {
                options.acceptedInsurance = urlParams.insuranceProvider;
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
        const { sortBy } = this.state;

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

                        const sortedItems = this.sortItems(items, sortBy);

                        return (
                            <DentistSearchPageView
                                data={sortedItems}
                                total={items.length}
                                loading={loading}
                                isFilterVisible={this.state.isFilterVisible}
                                onToggleFilter={this.onToggleFilter}
                                sortBy={sortBy}
                                setSortBy={this.setSortBy}
                            />
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default compose(withApollo)(DetailsSearchPage);
