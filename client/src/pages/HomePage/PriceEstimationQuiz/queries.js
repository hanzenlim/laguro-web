import { gql } from 'apollo-boost';

export const CHECK_ELIGIBILITY = gql`
    query checkEligibility($input: InsurancePatientInput!) {
        checkEligibility(input: $input) {
            id
            isEligible
            insuranceName
            planBegin
            planEnd
        }
    }
`;
