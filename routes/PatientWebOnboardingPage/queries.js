import { gql } from 'apollo-boost';
import moment from 'moment';
import { STATUS, ACTIVE, END_TIME } from '~/util/strings';

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
                policyHolderId
                insuranceProvider
                insuranceProviderId
                planOrGroupNumber
                policyHolderUserId
                policyHolderUser {
                    firstName
                    lastName
                    gender
                    dob
                    address {
                        streetAddress
                        addressDetails
                        zipCode
                        state
                        city
                    }
                }
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
                )   {
                id
            }
            firstName
            lastName
            hasSubmittedHealthHistoryForm
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

export const UPDATE_PATIENT_HEALTH_DATA = gql`
    mutation updatePatientHealthData($input: UpdatePatientHealthDataInput!) {
        updatePatientHealthData(input: $input) {
            id
            hasSubmittedHealthHistoryForm
        }
    }
`;

export const GET_PATIENT_HEALTH_DATA_UNSTRUCTURED = gql`
    query($patientId: String!) {
        getPatientHealthDataUnstructured(patientId: $patientId) {
            id
            patientId
            items {
                key
                value
            }
            groupedItems {
                question
                answer
                group
            }
            dateCreated
        }
    }
`;
