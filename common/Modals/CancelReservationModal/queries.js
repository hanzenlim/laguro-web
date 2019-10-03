import { gql } from 'apollo-boost';

export const cancelReservationMutation = gql`
    mutation($input: CancelReservationInput!) {
        cancelReservation(input: $input) {
            id
        }
    }
`;
