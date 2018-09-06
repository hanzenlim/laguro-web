import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getUserQueryClient = gql`
    {
        activeUser @client {
            id
            firstName
            lastName
            imageUrl
            dentistId
        }
        visibleModal @client
    }
`;

export const getUserQuery = gql`
    query($id: String!) {
        getUser(id: $id) {
            dentist {
                offices {
                    id
                }
            }
        }
    }
`;
