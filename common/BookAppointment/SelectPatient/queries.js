import { gql } from 'apollo-boost';

export const GET_USER = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            family {
                members {
                    id
                    firstName
                    lastName
                    imageUrl
                    relationshipToPrimary
                }
            }
        }
    }
`;
