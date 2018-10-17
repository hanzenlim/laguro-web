import { gql } from 'apollo-boost';

export const getDentistIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const cancelReservationMutation = gql`
    mutation($input: CancelReservationInput!) {
        cancelReservation(input: $input) {
            id
        }
    }
`;
