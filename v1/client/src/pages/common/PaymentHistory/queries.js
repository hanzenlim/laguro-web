import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const GET_PAYMENT_HISTORY_QUERY = gql`
    query QueryPayments($input: QueryParams!) {
        queryPayments(input: $input) {
            id
            dateCreated
            invoice {
                items {
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
            payer {
                id
                firstName
                lastName
            }
            payee {
                id
                firstName
                lastName
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
