import { gql } from 'apollo-boost';

// eslint-disable-next-line
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
