import { gql } from 'apollo-boost';

export const UPDATE_PATIENT_HEALTH_DATA = gql`
    mutation updatePatientHealthData($input: UpdatePatientHealthDataInput!) {
        updatePatientHealthData(input: $input) {
            id
            hasSubmittedHealthHistoryForm
            insuranceInfo {
                useInsurance
            }
        }
    }
`;

export const ACTIVE_USER = gql`
    {
        activeUser @client {
            id
            insuranceInfo {
                useInsurance
            }
        }
    }
`;
