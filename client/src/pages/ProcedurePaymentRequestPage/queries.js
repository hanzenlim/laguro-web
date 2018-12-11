import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    {
        activeUser @client {
            id
        }
    }
`;

export const getPaymentRequestByPayerQuery = gql`
    query GetPaymentRequestByPayer($input: GetPaymentRequestByPayer!) {
        getPaymentRequestByPayer(input: $input) {
            id
            invoice {
                items {
                    name
                    originalPrice
                    totalPrice
                }
            }
            type
            status
            installmentPlan {
                outstandingAmount
                recurringChargeAmount
                numChargePeriods
                downPaymentAmount
                interval
            }
            originalPrice
            nominalAmount
        }
    }
`;

export const acceptOrRejectPaymentRequestMutation = gql`
    mutation AcceptOrRejectProcedureSetPaymentRequest(
        $input: AcceptOrRejectPaymentRequestInput!
    ) {
        acceptOrRejectProcedureSetPaymentRequest(input: $input) {
            id
            status
        }
    }
`;
