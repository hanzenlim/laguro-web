import { gql } from 'apollo-boost';

export const checkIntoKioskMutation = gql`
    mutation checkIntoKiosk($input: CheckIntoKioskInput!) {
        checkIntoKiosk(input: $input) {
            authToken
            userId
        }
    }
`;

export const getUserQuery = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            firstName
            middleName
            lastName
            imageUrl
            dentistId
            email
            isDentist
            isHost
            hasSubmittedHealthHistoryForm
            dentist {
                bio
            }
        }
    }
`;
