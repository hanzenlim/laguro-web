import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const getActiveUserQuery = gql`
    {
        activeUser @client {
            id
            firstName
            lastName
            imageUrl
            email
            intercomHash
            dentistId
            isDentist
            isHost
        }
    }
`;

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
            }
        }
    }
`;

export const createDentistMutation = gql`
    mutation createDentist($input: CreateDentistInput!) {
        createDentist(input: $input) {
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
        }
    }
`;
