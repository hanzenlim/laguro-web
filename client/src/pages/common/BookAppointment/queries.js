import { gql } from 'apollo-boost';
import moment from 'moment';

import { STATUS, ACTIVE, END_TIME } from '../../../util/strings';

export const getDentistQuery = gql`
    query($id: String!) {
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
                status
                location {
                    name
                }
                localAvailableTimes {
                    startTime
                    endTime
                }
                appointments(
                    options: {
                        filters: [
                            { filterKey: "status", filterValue: "ACTIVE" }
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
        }
    }
`;

export const getUserQuery = gql`
    {
        activeUser @client {
            id
        }
    }
`;

export const checkPatientVerified = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            isVerified
            sentVerificationDocuments
        }
    }
`;
