import { gql } from 'apollo-boost';
import moment from 'moment';

import {
    STATUS,
    ACTIVE,
    END_TIME,
    PENDING_PATIENT_APPROVAL,
} from '~/util/strings';

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
                            filterValues: ["${ACTIVE}"]
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
                                filterValues: ["${ACTIVE}", "${PENDING_PATIENT_APPROVAL}"]
                            }
                        ]
                    }
                ) {
                    id
                    startTime
                    localStartTime
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
