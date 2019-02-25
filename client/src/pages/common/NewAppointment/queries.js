import { gql } from 'apollo-boost';
import moment from 'moment';
import {
    STATUS,
    ACTIVE,
    PENDING_PATIENT_APPROVAL,
    END_TIME,
} from '../../../util/strings';

export const requestAppointmentMutation = gql`
    mutation RequestAppointment($input: RequestAppointmentInput!) {
        requestAppointment(input: $input) {
            id
        }
    }
`;

export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            patients {
                id
                firstName
                lastName
                imageUrl
                appointments(
                    options: {
                        filters: [{ filterKey: "dentistId", filterValues: [$id] }]
                    }
                ) {
                    id
                    localStartTime
                }
                patientImages {
                    imageUrl
                    signedImageUrl
                }
            }
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
                            { filterKey: "status", filterValues: ["${PENDING_PATIENT_APPROVAL}", "${ACTIVE}"] }
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
