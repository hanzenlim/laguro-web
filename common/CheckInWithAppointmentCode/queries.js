import { gql } from 'apollo-boost';

/* eslint-disable-next-line */
export const checkIntoKioskMutation = gql`
    mutation checkIntoKiosk($input: CheckIntoKioskInput!) {
        checkIntoKiosk(input: $input) {
            authToken
            appointmentId
            userId
        }
    }
`;
