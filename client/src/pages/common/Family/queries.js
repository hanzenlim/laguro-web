import { gql } from 'apollo-boost';

export const getFamilyQuery = gql`
    query GetUser($id: String!) {
        getUser(id: $id) {
            id
            family {
                primaryUser {
                    id
                }
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
