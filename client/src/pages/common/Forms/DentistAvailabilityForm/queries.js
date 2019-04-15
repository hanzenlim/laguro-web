import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            dentist {
                id
                preferredAvailability {
                    startDay
                    endDay
                    startTime
                    endTime
                    days
                    preferredLocationIndices
                }
            }
        }
    }
`;

export const updateDentistMutation = gql`
    mutation updateDentist($input: UpdateDentistInput!) {
        updateDentist(input: $input) {
            id
            preferredAvailability {
                startDay
                endDay
                startTime
                endTime
                days
                preferredLocationIndices
            }
        }
    }
`;
