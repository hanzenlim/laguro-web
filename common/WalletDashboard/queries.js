import { gql } from 'apollo-boost';

export const GET_WALLET_BY_USER_ID = gql`
    query(
        $input: GetWalletByUserIdInput!
        $rangeStart: String!
        $rangeEnd: String!
    ) {
        getWalletByUserId(input: $input) {
            id
            userId
            pendingAmount
            laguroCreditAmount
            availableAmount
            totalAmount
            transactions(
                options: { rangeStart: $rangeStart, rangeEnd: $rangeEnd }
            ) {
                id
                amount
                description
                type
                dateCreated
                isValid
            }
            dateCreated
        }
    }
`;

export const GET_USER = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            firstName
            lastName
            dob
            email
            address {
                streetAddress
                addressDetails
                city
                state
                zipCode
            }
            dentist {
                id
                ssnOrEinOrTin
            }
            dwollaCustomerUrl
        }
    }
`;

export const GET_PAYMENT_OPTIONS = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            paymentOptions {
                id
                last4
                brand
            }
        }
    }
`;

export const GET_DWOLLA_IAV_TOKEN = gql`
    query getDwollaIavToken($input: GetDwollaIavTokenInput!) {
        getDwollaIavToken(input: $input)
    }
`;

export const GET_DWOLLA_FUNDING_SOURCES = gql`
    query getDwollaFundingSources($input: GetDwollaFundingSourcesInput!) {
        getDwollaFundingSources(input: $input) {
            fundingSourceUrl
            name
        }
    }
`;

export const GET_TRANSFER_INFO = gql`
    query getTransferInfo($input: GetTransferInfoInput!) {
        getTransferInfo(input: $input) {
            standardClearingFees {
                feeAmount
            }
            nextAvailableClearingFees {
                feeAmount
            }
            transactionAmountMaximum
        }
    }
`;
