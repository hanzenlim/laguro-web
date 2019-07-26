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
            processingAmount
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
            }
            dateCreated
        }
    }
`;

export default GET_WALLET_BY_USER_ID;
