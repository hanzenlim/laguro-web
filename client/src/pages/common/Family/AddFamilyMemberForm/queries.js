import { gql } from 'apollo-boost';

export const addMemberToFamilyMutation = gql`
    mutation addMemberToFamily($input: AddMemberToFamilyInput!) {
        addMemberToFamily(input: $input) {
            id
            relationshipToPrimary
            family {
                primaryUser {
                    id
                    firstName
                    middleName
                    lastName
                }
            }
        }
    }
`;

export const updateUserMutation = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            firstName
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

export const refreshAuthTokenMutation = gql`
    mutation {
        refreshAuthToken
    }
`;

export const removeMemberFromFamilyMutation = gql`
    mutation removeMemberFromFamily($input: RemoveMemberFromFamilyInput!) {
        removeMemberFromFamily(input: $input) {
            id
            relationshipToPrimary
            family {
                primaryUser {
                    id
                    firstName
                    middleName
                    lastName
                }
            }
        }
    }
`;

export const getFamilyQuery = gql`
    query GetUser($id: String!) {
        getUser(id: $id) {
            id
            firstName
            middleName
            lastName
            relationshipToPrimary
            imageUrl
            phoneNumber
            email
            dob
            gender
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
