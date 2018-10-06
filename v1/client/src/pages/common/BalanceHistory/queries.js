import { gql } from 'apollo-boost';

export const GET_PAYMENTS = gql`
    query QueryPayments($input: QueryParams!) {
        queryPayments(input: $input) {
            id
            invoice {
                items {
                    id
                    name
                    payoutAmount
                    quantity
                    type
                    totalPrice
                }
            }
            type
            status
            reservation {
                id
                startTime
                endTime
                office {
                    id
                    location {
                        name
                    }
                    name
                }
            }
            appointment {
                id
                startTime
                endTime
                reservation {
                    id
                    office {
                        id
                        location {
                            name
                        }
                        name
                    }
                }
            }
            procedures {
                id
                name
            }
            stripePayment {
                id
                created
                amount
                source {
                    brand
                    last4
                }
                refunds {
                    data {
                        created
                    }
                }
            }
            chargeStatus
            nominalAmount
            refundAmount
        }
    }
`;

export const GET_PAYOUT_LINK = gql`
    query GetUser($id: String!) {
        getUser(id: $id) {
            id
            payoutLoginLink
        }
    }
`;

export const PAYOUT_USER = gql`
    mutation($userId: String!) {
        payoutUser(userId: $userId)
    }
`;

export const ADD_PAYOUT_LINK = gql`
    mutation AddPayoutAccount($input: AddPayoutAccountInput!) {
        addPayoutAccount(input: $input) {
            id
            firstName
            middleName
            lastName
            imageUrl
            dentistId
            googleId
            password
            email
            intercomHash
            payoutLoginLink
        }
    }
`;
