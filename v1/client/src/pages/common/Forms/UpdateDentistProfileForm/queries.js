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

export const getDentistQuery = gql`
    query getDentist($id: String!) {
        getDentist(id: $id) {
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
        }
    }
`;
