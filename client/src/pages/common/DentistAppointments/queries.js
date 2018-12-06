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
                        .utc()
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
                status
                office {
                    id
                    name
                }
                localAvailableTimes {
                    startTime
                    endTime
                }
                numChairsSelected
                equipmentSelected
                appointments(
                    options: {
                        sortKey: "${END_TIME}",
                        rangeStart: "${moment()
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
                        id
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
