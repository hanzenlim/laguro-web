import { gql } from 'apollo-boost';

export const CREATE_OFFICE = gql`
    mutation CreateOffice($input: CreateOfficeInput!) {
        createOffice(input: $input) {
            id
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
            dentistId
        }
    }
`;
