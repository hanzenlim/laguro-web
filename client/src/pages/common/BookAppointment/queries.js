import { gql } from 'apollo-boost';
import moment from 'moment';

import {
    STATUS,
    ACTIVE,
    END_TIME,
    PENDING_PATIENT_APPROVAL,
} from '../../../util/strings';

export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            firstAppointmentDuration
            reservations(
                options: {
                    sortKey: "${END_TIME}",
                    rangeStart: "${moment()
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
                status
                location {
                    name
                    addressDetails
                }
                timezone
                numChairsSelected
                localAvailableTimes {
                    startTime
                    endTime
                }
                appointments(
                    options: {
                        filters: [
                            { filterKey: "status", filterValues: ["${ACTIVE}", "${PENDING_PATIENT_APPROVAL}"] }
                        ]
                    }
                ) {
                    id
                    localStartTime
                    localEndTime
                    status
                }
            }
        }
    }
`;

export const createAppointmentMutation = gql`
    mutation CreateAppointment($input: CreateAppointmentInput!) {
        createAppointment(input: $input) {
            id
            dentist {
                id
            }
            timezone
            localStartTime
            reservation {
                office {
                    id
                }
            }
        }
    }
`;
