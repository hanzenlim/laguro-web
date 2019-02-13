import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const ACTIVE_USER = gql`
    {
        activeUser @client {
            id
            firstName
            lastName
        }
    }
`;
