import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const GET_USER = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            firstName
            lastName
        }
    }
`;
