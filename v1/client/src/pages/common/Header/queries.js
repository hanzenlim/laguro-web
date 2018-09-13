import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getUserQuery = gql`
    {
        activeUser @client {
            id
            firstName
            lastName
            imageUrl
            email
            intercomHash
        }
        visibleModal @client
    }
`;
