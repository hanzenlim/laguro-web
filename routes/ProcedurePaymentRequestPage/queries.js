import { gql } from 'apollo-boost';

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
            laguroCredits
            originalPrice
            nominalAmount
            discount {
                rate
                amount
            }
        }
    }
`;

export const acceptOrRejectPaymentRequestMutation = gql`
    mutation AcceptOrRejectProcedureSetPaymentRequest(
        $input: AcceptOrRejectPaymentRequestInput!
    ) {
        acceptOrRejectProcedureSetPaymentRequest(input: $input)
    }
`;
