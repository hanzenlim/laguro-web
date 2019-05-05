import { gql } from 'apollo-boost';

export const getAllBundles = gql`
    query {
        getAllBundles {
            id
            group
        }
    }
`;

export const getBundleCoverage = gql`
    query getBundleCoverage($input: GetBundleCoverageInput) {
        getBundleCoverage(input: $input) {
            id
            name
            group
            dateCreated
            dateUpdated
            procedures
            proceduresDetail {
                code
                group
                name
            }
            price
            coverage
            insuranceName
            insurancePrice
            outOfPocket
            deductibleRemaining
            annualMaximumRemaining
            lastInsuranceUpdate
        }
    }
`;
