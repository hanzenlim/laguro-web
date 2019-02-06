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
                hasSubmittedHealthHistoryForm
            }
        }
    }
`;

export const SET_ACTIVE_USER = gql`
    mutation setActiveUser($input: Object) {
        setActiveUser(input: $input) @client
    }
`;
