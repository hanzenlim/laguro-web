import { gql } from 'apollo-boost';

export const updateInsuranceInfoMutation = gql`
    mutation updateInsuranceInfo($input: UpdateInsuranceInfoInput!) {
        updateInsuranceInfo(input: $input) {
            id
        }
    }
`;

export const addInsuranceDependentMutation = gql`
    mutation addInsuranceDependent($input: AddInsuranceDependentInput!) {
        addInsuranceDependent(input: $input) {
            id
        }
    }
`;

export const getFamilyQuery = gql`
    query GetUser($id: String!) {
        getUser(id: $id) {
            id
            firstName
            lastName
            dob
            insuranceInfo {
                insuranceProvider
                insuranceProviderId
                policyHolderId
                planOrGroupNumber
                policyHolderUserId
            }
        }
    }
`;

export const CHECK_ELIGIBILITY_QUERY = gql`
    query checkEligibility($input: InsurancePatientInput!) {
        checkEligibility(input: $input) {
            id
            isEligible
        }
    }
`;
