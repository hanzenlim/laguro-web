import { gql } from 'apollo-boost';
import moment from 'moment';
import { STATUS, ACTIVE, END_TIME } from '~/util/strings';

export const SEND_KIOSK_LOGIN_CODE = gql`
    mutation sendKioskLoginCode($input: SendLoginCodeInput!) {
        sendKioskLoginCode(input: $input)
    }
`;

export const SEND_REGISTRATION_CODE = gql`
    mutation sendRegistrationCode($input: SendRegistrationCodeInput!) {
        sendRegistrationCode(input: $input)
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
                imageUrl
                dentistId
                googleId
                email
                isDentist
                isHost
                hasSubmittedHealthHistoryForm
                insuranceInfo {
                    policyHolderId
                }
                dentist {
                    id
                    bio
                }
                appointments(
                    options: {
                        sortKey: "${END_TIME}",
                        rangeStart: "${moment()
                            .startOf('days')
                            .format()}",
                        filters: [
                            {
                                filterKey: "${STATUS}",
                                filterValues: ["${ACTIVE}"]
                            }
                        ]
                    }
                )  {
                    id
                    startTime
                    status
                }
                patientDocument {
                    dentistPhotoId {
                        url
                    }
                    warranty {
                        url
                    }
                    stateDentalLicense {
                        url
                    }
                }
            }
            authToken {
                body
            }
        }
    }
`;

export const REGISTER_USER = gql`
    mutation registerUser($input: RegisterUserInput!) {
        registerUser(input: $input) {
            user {
                id
                firstName
                middleName
                lastName
                imageUrl
                dentistId
                googleId
                email
                isDentist
                isHost
                hasSubmittedHealthHistoryForm
                appointments(
                    options: {
                        sortKey: "${END_TIME}",
                        rangeStart: "${moment()
                            .startOf('days')
                            .format()}",
                        filters: [
                            {
                                filterKey: "${STATUS}",
                                filterValues: ["${ACTIVE}"]
                            }
                        ]
                    }
                )  {
                    id
                    startTime
                    status
                }
                patientDocument {
                    dentistPhotoId {
                        url
                    }
                    warranty {
                        url
                    }
                    stateDentalLicense {
                        url
                    }
                }
            }
            authToken {
                body
            }
        }
    }
`;
