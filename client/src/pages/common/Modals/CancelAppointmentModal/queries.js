import { gql } from 'apollo-boost';

export const getPatientIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const cancelAppointmentMutation = gql`
    mutation($input: CancelAppointmentInput!) {
        cancelAppointment(input: $input) {
            id
        }
    }
`;
