import { gql } from 'apollo-boost';

export const CREATE_OFFICE = gql`
    mutation createUserOffice($input: CreateUserOfficeInput!) {
        createUserOffice(input: $input) {
            id
            host {
                id
                user {
                    id
                    firstName
                    lastName
                    imageUrl
                    email
                    intercomHash
                    dentistId
                    isDentist
                    isHost
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
            firstName
            lastName
        }
    }
`;

export const UPDATE_OFFICE = gql`
    mutation UpdateOffice($input: UpdateOfficeInput!) {
        updateOffice(input: $input) {
            id
            name
            description
            location {
                name
                geoPoint {
                    lat
                    lon
                }
                addressDetails
            }
            imageUrls
            equipment {
                name
                price
            }
        }
    }
`;

export const GET_OFFICE = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            name
            equipment {
                name
                price
            }
            description
            location {
                name
                addressDetails
                geoPoint {
                    lat
                    lon
                }
            }
            imageUrls
        }
    }
`;
