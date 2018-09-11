import { gql } from 'apollo-boost';

export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            reservations {
                id
                location {
                    name
                }
                availableTimes {
                    startTime
                    endTime
                }
                appointments {
                    id
                    startTime
                    endTime
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
