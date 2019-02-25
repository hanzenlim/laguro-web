import { gql } from 'apollo-boost';
import moment from 'moment';

import { STATUS, ACTIVE, END_TIME } from '../../../util/strings';

export const getDentistQuery = gql`
    query getDentist($id: String!) {
        getDentist(id: $id) {
            id
            offices(
                options: {
                    filters: [
                        {
                            filterKey: "${STATUS}",
                            filterValues: ["${ACTIVE}"]
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
                    addressDetails
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
                                filterValues: ["${ACTIVE}"]
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
                                    filterValues: ["${ACTIVE}"]
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
