import makeApiCall from '../util/clientDataLoader';
import { paymentFragment } from '../util/fragments';

const getPaymentQuery = `
    query ($id: String!) {
        getPayment(id: $id) {
            ${paymentFragment}
        }
    }
`;

const queryPaymentsQuery = `
    query QueryPayments($input: QueryParams!) {
        queryPayments(input: $input) {
            ${paymentFragment}
        }
    }
`;

const Payment = {
    query: async (
        partitionKey,
        partitionValue,
        sortKey = null,
        rangeStart = null,
        rangeEnd = null
    ) => {
        const response = await makeApiCall(queryPaymentsQuery, {
            input: {
                partitionKey,
                partitionValue,
                sortKey,
                rangeStart,
                rangeEnd
            }
        });
        return response.data.queryPayments;
    },
    get: async paymentId => {
        if (!paymentId) {
            return null;
        }
        const response = await makeApiCall(getPaymentQuery, { id: paymentId });
        return response.data.getPayment;
    }
};

export default Payment;
