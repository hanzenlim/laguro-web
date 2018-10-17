import { gql } from 'apollo-boost';

export const getDentistIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const cancelListingMutation = gql`
    mutation($input: CancelListingInput!) {
        cancelListing(input: $input) {
            id
        }
    }
`;
