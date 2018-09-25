import { gql } from 'apollo-boost';
import moment from 'moment';

import { STATUS, ACTIVE, END_TIME } from '../../../util/strings';

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
                office {
                    name
                }
                availableTimes {
                    startTime
                    endTime
                }
                numChairsSelected
                equipmentSelected
                appointments(
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
                    startTime
                    patient {
                        lastName
                        firstName
                        imageUrl
                    }
                    status
                }
            }
        }
    }
`;
