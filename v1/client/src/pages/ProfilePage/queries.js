import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getIdQueryClient = gql`
    {
        activeUser @client {
            id
        }
    }
`;

export const getUserQuery = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            dentistId
            isHost
            isDentist
            dentist {
                offices {
                    id
                }
            }
        }
    }
`;
