import { gql } from 'apollo-boost';

export const getActiveUserQuery = gql`
    {
        activeUser @client {
            id
        }
    }
`;
