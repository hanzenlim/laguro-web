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
                user {
                    firstName
                    lastName
                    imageUrl
                }
            }
            reservation {
                office {
                    name
                }
            }
            startTime
            status
        }
    }
`;
