import { gql } from 'apollo-boost';

export const getPatientIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const getAppointmentsQuery = gql`
    query getAppointments($input: QueryParams!) {
        queryAppointments(input: $input) {
            id
            dentist {
                id
                user {
                    id
                    firstName
                    lastName
                    imageUrl
                }
            }
            reservation {
                id
                office {
                    id
                    name
                }
            }
            localStartTime
            status
        }
    }
`;
