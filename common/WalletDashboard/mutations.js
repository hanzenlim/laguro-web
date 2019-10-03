import { gql } from 'apollo-boost';

export const REGISTER_PERSONAL_DWOLLA_CUSTOMER = gql`
    mutation($input: RegisterPersonalDwollaCustomerInput!) {
        registerPersonalDwollaCustomer(input: $input)
    }
`;

export const REGISTER_UNVERIFIED_DWOLLA_CUSTOMER = gql`
    mutation($input: RegisterUnverifiedDwollaCustomerInput!) {
        registerUnverifiedDwollaCustomer(input: $input)
    }
`;

export const REMOVE_DWOLLA_FUNDING_SOURCE = gql`
    mutation($input: RemoveDwollaFundingSourceInput!) {
        removeDwollaFundingSource(input: $input)
    }
`;

export const WITHDRAW_CREDIT = gql`
    mutation($input: WithDrawFundsFromWalletInput!) {
        withdrawFundsFromWallet(input: $input) {
            principalWalletTransaction {
                id
                amount
            }
            feeWalletTransaction {
                id
                amount
            }
            transferUrl
        }
    }
`;

export const ADD_CREDIT = gql`
    mutation($input: PurchaseLaguroCreditsInput!) {
        purchaseLaguroCredits(input: $input)
    }
`;
