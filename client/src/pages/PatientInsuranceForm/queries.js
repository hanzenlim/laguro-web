import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

import { insuranceClient } from '../../util/apolloClients';

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
            firstName
            lastName
            dob
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

export const checkEligibility = graphql(CHECK_ELIGIBILITY, {
    options: props => ({
        variables: { input: { ...props } },
        fetchPolicy: 'network-only',
        client: insuranceClient,
    }),
});
