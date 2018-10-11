import { gql } from 'apollo-boost';

export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            reservations {
                id
                location {
                    name
                }
                availableTimes {
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
                    startTime
                    endTime
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
        }
    }
`;
