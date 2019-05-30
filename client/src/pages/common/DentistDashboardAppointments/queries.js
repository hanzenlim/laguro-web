import { gql } from 'apollo-boost';

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
            patient {
                id
                firstName
                lastName
                imageUrl
            }
            office {
                id
                name
                location {
                    name
                }
            }
            startTime
            endTime
            localStartTime
            localEndTime
            status
            payment {
                id
                procedures {
                    id
                    name
                }
            }
        }
    }
`;
