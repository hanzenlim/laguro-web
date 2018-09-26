import { gql } from 'apollo-boost';

export const CREATE_OFFICE = gql`
    mutation createUserOffice($input: CreateUserOfficeInput!) {
        createUserOffice(input: $input) {
            id
            host {
                user {
                    id
                    firstName
                    lastName
                    imageUrl
                    email
                    intercomHash
                    dentistId
                }
            }
        }
    }
`;
export const CREATE_LISTING = gql`
    mutation batchCreateListings($input: [CreateListingInput!]) {
        batchCreateListings(input: $input) {
            id
        }
    }
`;
export const GET_USER = gql`
    {
        activeUser @client {
            id
        }
    }
`;
