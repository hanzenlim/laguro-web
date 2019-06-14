import { gql } from 'apollo-boost';

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

export const CHECK_ELIGIBILITY = gql`
    query checkEligibility($input: InsurancePatientInput!) {
        checkEligibility(input: $input) {
            id
            isEligible
        }
    }
`;
