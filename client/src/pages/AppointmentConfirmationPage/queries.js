import { gql } from 'apollo-boost';

export const getAppointmentsQuery = gql`
    query getAppointment($id: String!) {
        getAppointment(id: $id) {
            id
            dentist {
                id
                user {
                    id
                    dentistId
                    firstName
                    lastName
                    imageUrl
                }
            }
            reservation {
                office {
                    name
                    location {
                        name
                    }
                }
            }
            localStartTime
            localEndTime
            status
        }
    }
`;

export const acceptOrRejectAppointmentRequestMutation = gql`
    mutation AcceptOrRejectAppointmentRequest(
        $input: AcceptOrRejectAppointmentRequestInput!
    ) {
        acceptOrRejectAppointmentRequest(input: $input) {
            id
            status
        }
    }
`;
