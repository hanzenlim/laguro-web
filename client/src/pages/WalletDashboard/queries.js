import { gql } from 'apollo-boost';

export const GET_WALLET_BY_USER_ID = (rangeStart, rangeEnd) => gql`
    query($input: GetWalletByUserIdInput!) {
        getWalletByUserId(input: $input) {
            id
            userId
            balance
            balanceBreakdown {
                pendingAmount
                processingAmount
                availableAmount
                balance
            }
            transactions(
                options: {
                    rangeStart: "${rangeStart}",
                    rangeEnd: "${rangeEnd}",
                }
            ){
                id
                amount
                description
                type
                dateCreated
            }
            dateCreated
        }
    }
`;
