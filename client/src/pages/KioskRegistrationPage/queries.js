import { gql } from 'apollo-boost';

export const SEND_KIOSK_LOGIN_CODE = gql`
    mutation sendKioskLoginCode($input: SendKioskLoginCodeInput!) {
        sendKioskLoginCode(input: $input)
    }
`;

export const LOGIN = gql`
    mutation login($input: LoginInput!) {
        login(input: $input) {
            user {
                id
                firstName
                middleName
                lastName
                hasSubmittedHealthHistoryForm
                appointments {
                    id
                    startTime
                    status
                }
            }
            authToken {
                body
            }
        }
    }
`;

export const SET_ACTIVE_USER = gql`
    mutation setActiveUser($input: Object) {
        setActiveUser(input: $input) @client
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            firstName
        }
    }
`;