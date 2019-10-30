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
                email
                isDentist
                isHost
                hasSubmittedHealthHistoryForm
                dentist {
                    bio
                }
                family {
                    members {
                        id
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

export const UPDATE_INSURANCE_INFO_MUTATION = gql`
    mutation updateInsuranceInfo($input: UpdateInsuranceInfoInput!) {
        updateInsuranceInfo(input: $input) {
            id
        }
    }
`;

export const GET_USER = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            insuranceInfo {
                issueDate
                policyHolderId
                insuranceProvider
                insuranceProviderId
                planOrGroupNumber
            }
            address {
                streetAddress
                addressDetails
                city
                zipCode
                state
            }
            dob
            gender
        }
    }
`;

export const UPDATE_USER_MUTATION = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            imageUrl
            firstName
            middleName
            lastName
            phoneNumber
            dentistId
            isDentist
            isHost
            googleId
            password
            email
            notificationSettings {
                general {
                    email
                    sms
                }
            }
        }
    }
`;

// eslint-disable-next-line
export const GET_APPOINTMENT = gql`
    query getAppointment($id: String!) {
        getAppointment(id: $id) {
            id
            dentist {
                id
                totalRating
                user {
                    firstName
                    lastName
                    imageUrl
                }
            }
            localStartTime
            localEndTime
            status
            patient {
                id
                hasSubmittedHealthHistoryForm
            }
        }
    }
`;

export const GET_OFFICE = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            name
        }
    }
`;

export const CREATE_PATIENT_APPOINTMENT_ONBOARDING = gql`
    mutation CreatePatientAppointmentOnboarding(
        $input: CreatePatientAppointmentOnboardingInput!
    ) {
        createPatientAppointmentOnboarding(input: $input) {
            id
        }
    }
`;
