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

export const GET_BUNDLE_GROUP_COVERAGE = gql`
    query getBundleGroupCoverage($input: GetBundleGroupCoverageInput) {
        getBundleGroupCoverage(input: $input) {
            id
            name
            price
            coverage
            proceduresDetail {
                name
                code
            }
            group
            insuranceName
            insurancePrice
            outOfPocket
            deductibleRemaining
            annualMaximumRemaining
        }
    }
`;
