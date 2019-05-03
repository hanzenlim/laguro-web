import { gql } from 'apollo-boost';

export const cancelAppointmentMutation = gql`
    mutation($input: CancelAppointmentInput!) {
        cancelAppointment(input: $input)
    }
`;
