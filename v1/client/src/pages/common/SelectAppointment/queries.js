import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    {
        activeUser @client {
            firstName
            lastName
            imageUrl
        }
        visibleModal @client
    }
`;
