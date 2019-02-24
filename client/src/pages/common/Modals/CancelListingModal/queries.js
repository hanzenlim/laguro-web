import { gql } from 'apollo-boost';

export const cancelListingMutation = gql`
    mutation($input: CancelListingInput!) {
        cancelListing(input: $input) {
            id
        }
    }
`;
