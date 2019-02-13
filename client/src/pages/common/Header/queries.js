import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    {
        activeUser @client {
            id
            firstName
            lastName
        }
        visibleModal @client
    }
`;
