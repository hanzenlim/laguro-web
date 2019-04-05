import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            emergencyContact {
                firstName
                lastName
                relationship
                phoneNumber
            }
            address {
                streetAddress
                addressDetails
                city
                zipCode
                state
            }
        }
    }
`;

export const updateUserMutation = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            emergencyContact {
                firstName
                lastName
                relationship
                phoneNumber
            }
            address {
                streetAddress
                addressDetails
                city
                zipCode
                state
            }
        }
    }
`;
