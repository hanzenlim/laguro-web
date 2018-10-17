import { gql } from 'apollo-boost';

export const getUserQuery = gql`
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
        visibleModal @client
    }
`;
