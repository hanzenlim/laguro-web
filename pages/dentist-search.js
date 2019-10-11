import React, { Fragment, PureComponent, createContext } from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';
import { withRouter } from 'next/router';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';
import queryString from 'query-string';

import DentistSearchPageView from '../routes/DentistSearch/DentistSearchPageView';
import { GET_DENTISTS_AND_APPOINTMENT_SLOTS } from '../routes/DentistSearch/queries';
import { supportedInsuranceList } from '~/data';

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
    'First Visit': ['Exams', 'Deep Cleaning', 'Fillings'],
    'General procedures': [
        'Exams',
        'Deep Cleaning',
        'Fillings',
        'Implant crown',
    ],
    Surgery: [
        'Crowns/Bridges/Venners',
        'Root Canals',
        'Implant placement',
        'Implant crown',
        'Extractions/Surgery',
    ],
    'Special treatment': ['Dentures', 'Braces', 'Whitening/Cosmetic'],
};

export const DentistSearchFilterContext = createContext();

class DetailsSearchPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isFilterVisible: false,
            sortBy: sortByList[0].value,
            urlParams: this.props.router.query,
        };

        this.refetch = () => {};
    }

    componentDidMount = async () => {
        if (window && window.localStorage) {
            const answers = window.localStorage.getItem('homepageSurvey');
            const parsedAnswers = JSON.parse(answers);
            const sortBy = window.localStorage.getItem('sortBy');

            if (sortBy) {
                this.setState({ sortBy });
            }

            if (parsedAnswers) {
                this.setUrlParams(parsedAnswers);
            }
        }
    };

    onToggleFilter = () => {
        this.setState({ isFilterVisible: !this.state.isFilterVisible });
    };

    setSortBy = value => {
        localStorage.setItem('sortBy', value);
        this.setState({ sortBy: value });
    };

    setUrlParams = urlParams => {
        this.setState({ urlParams });
        window.history.pushState(
            '',
            '',
            `?${queryString.stringify(urlParams)}`
        );
    };

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
        const { sortBy, urlParams } = this.state;
        const queryParams = this.buildQueryParams(urlParams);

        return (
            <Query
                query={GET_DENTISTS_AND_APPOINTMENT_SLOTS}
                variables={{
                    input: queryParams,
                }}
                notifyOnNetworkStatusChange
                context={{ clientName: 'appointment' }}
            >
                {({ data, loading, refetch }) => {
                    this.refetch = refetch;
                    const items = _get(
                        data,
                        'searchForDentistsAndAppointmentSlots',
                        []
                    );

                    const sortedItems = this.sortItems(items, sortBy);

                    const structuredSchema = `
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": ${JSON.stringify(items.map((item, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "url": `https://www.laguro.com/dentist/${item.permalink ||
                                item.dentistId}`
                        })))}
                    }`;

                    return (
                        <Fragment>
                            <Head>
                                <title>Search Dentist - Laguro</title>
                                <meta
                                    name="description"
                                    content="The Laguro Dentist Search tool can help you find a dentist that will best fit your needs"
                                />
                                <link
                                    rel="canonical"
                                    href="https://www.laguro.com/dentist/search"
                                />
                                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: structuredSchema}} />
                            </Head>
                            <DentistSearchFilterContext.Provider
                                value={{
                                    urlParams,
                                    setUrlParams: this.setUrlParams,
                                }}
                            >
                                <DentistSearchPageView
                                    data={sortedItems}
                                    total={items.length}
                                    loading={loading}
                                    isFilterVisible={this.state.isFilterVisible}
                                    onToggleFilter={this.onToggleFilter}
                                    sortBy={sortBy}
                                    setSortBy={this.setSortBy}
                                />
                            </DentistSearchFilterContext.Provider>
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(DetailsSearchPage);
