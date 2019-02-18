import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getIdQueryClient = gql`
    {
        activeUser @client {
            id
        }
    }
`;
export const updateInsuranceInfoMutation = gql`
    mutation updateInsuranceInfo($input: UpdateInsuranceInfoInput!) {
        updateInsuranceInfo(input: $input) {
            id
        }
    }
`;

export const getUser = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            insuranceInfo {
                useInsurance
                policyHolderId
                insuranceProvider
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
