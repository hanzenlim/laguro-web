import { gql } from 'apollo-boost';

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

export const getUserQuery = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            dentist {
                id
                specialty
                bio
            }
        }
    }
`;
