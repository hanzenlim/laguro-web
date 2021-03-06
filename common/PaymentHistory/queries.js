import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const GET_PAYMENT_HISTORY_QUERY = gql`
    query QueryPayments($input: QueryParams!) {
        queryPayments(input: $input) {
            id
            dateCreated
            discount {
                rate
                amount
            }
            invoice {
                items {
                    name
                    payoutAmount
                    quantity
                    type
                    totalPrice
                    originalPrice
                    procedureSet {
                        name
                        price
                    }
                }
            }
            paymentInstallmentPlan {
                downPaymentAmount
                interval
                numChargePeriods
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
                availableTimes {
                    startTime
                    endTime
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
            paymentInstallmentPlan {
                charges {
                    amount
                    isDownPayment
                }
            }
        }
    }
`;
