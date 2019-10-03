import { gql } from 'apollo-boost';

export const UPDATE_PATIENT_HEALTH_DATA = gql`
    mutation updatePatientHealthData($input: UpdatePatientHealthDataInput!) {
        updatePatientHealthData(input: $input) {
            id
            hasSubmittedHealthHistoryForm
            insuranceInfo {
                insuranceProvider
            }
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

export const GET_USER = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            insuranceInfo {
                insuranceProvider
            }
        }
    }
`;
