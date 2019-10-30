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
                issueDate
                insuranceProvider
                insuranceProviderId
                policyHolderId
                planOrGroupNumber
                policyHolderUserId
                policyHolderUser {
                    firstName
                    lastName
                    dob
                    gender
                    address {
                        streetAddress
                        addressDetails
                        zipCode
                        state
                        city
                    }
                }
            }
        }
    }
`;
