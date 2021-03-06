import { gql } from 'apollo-boost';

export const getUserDentistQuery = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            dentist {
                id
                specialty
                bio
                procedures {
                    group
                    name
                    code
                    duration
                }
                firstAppointmentDuration
            }
        }
    }
`;

export const createDentistMutation = gql`
    mutation createDentistWithAuth($input: CreateDentistInput!) {
        createDentistWithAuth(input: $input) {
            id
            specialty
            bio
            user {
                id
            }
            procedures {
                group
                name
                code
                duration
            }
            firstAppointmentDuration
            token
        }
    }
`;

export const updateDentistMutation = gql`
    mutation updateDentist($input: UpdateDentistInput!) {
        updateDentist(input: $input) {
            id
            specialty
            bio
            procedures {
                group
                name
                code
                duration
            }
            user {
                id
            }
            firstAppointmentDuration
        }
    }
`;
