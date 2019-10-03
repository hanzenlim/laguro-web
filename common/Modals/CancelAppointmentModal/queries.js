import { gql } from 'apollo-boost';

export const withdrawAppointmentRequestMutation = gql`
    mutation($input: WithdrawAppointmentRequestInput!) {
        withdrawAppointmentRequest(input: $input)
    }
`;

export const cancelAppointmentMutation = gql`
    mutation($input: CancelAppointmentInput!) {
        cancelAppointment(input: $input)
    }
`;
