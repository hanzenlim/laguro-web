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
                issueDate
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
            firstName
            lastName
            dob
        }
    }
`;
