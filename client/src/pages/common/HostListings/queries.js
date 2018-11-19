import { gql } from 'apollo-boost';
import moment from 'moment';

import { STATUS, ACTIVE, END_TIME } from '../../../util/strings';

// eslint-disable-next-line
export const getDentistIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const getDentistQuery = gql`
    query getDentist($id: String!) {
        getDentist(id: $id) {
            id
            offices(
                options: {
                    filters: [
                        {
                            filterKey: "${STATUS}",
                            filterValue: "${ACTIVE}"
                        }
                    ]
                }
            ) {
                id
                name
                equipment {
                    name
                }
                location {
                    name
                }
                listings(
                    options: {
                        sortKey: "${END_TIME}",
                        rangeStart: "${moment()
                            .startOf('hour')
                            .startOf('days')
                            .format()}",
                        filters: [
                            {
                                filterKey: "${STATUS}",
                                filterValue: "${ACTIVE}"
                            }
                        ]
                    }
                ) {
                    id
                    availability {
                        startDay
                        endDay
                        startTime
                        endTime
                        days
                    }
                    localStartTime
                    localEndTime
                    reservations(
                        options: {
                            sortKey: "${END_TIME}",
                            rangeStart: "${moment()
                                .startOf('hour')
                                .startOf('days')
                                .format()}",
                            filters: [
                                {
                                    filterKey: "${STATUS}",
                                    filterValue: "${ACTIVE}"
                                }
                            ]
                        }
                    ) {
                        id
                        availableTimes {
                            startTime
                            endTime
                        }
                        reservedBy {
                            id
                            user {
                                id
                                firstName
                                lastName
                                imageUrl
                            }
                        }
                        numChairsSelected
                        equipmentSelected
                    }
                }
            }
        }
    }
`;
