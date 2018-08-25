import makeApiCall from '../util/clientDataLoader';
import { paymentOptionFragment } from '../util/fragments';

const addPaymentOptionQuery = `
    mutation AddPaymentOption($input: AddPaymentOptionInput!) {
        addPaymentOption(input: $input) {
            ${paymentOptionFragment}
        }
    }
`;

const removePaymentOptionQuery = `
    mutation RemovePaymentOption($input: RemovePaymentOptionInput!) {
        removePaymentOption(input: $input)
    }
`;

const PaymentOption = {
    create: async (userId, paymentToken) => {
        if (!userId || !paymentToken) {
            return null;
        }
        const response = await makeApiCall(addPaymentOptionQuery, {
            input: { userId, paymentToken }
        });
        return response.data.addPaymentOption;
    },
    delete: async (userId, paymentToken) => {
        if (!userId || !paymentToken) {
            return null;
        }
        const response = await makeApiCall(removePaymentOptionQuery, {
            input: { userId, paymentToken }
        });
        return response.data.removePaymentOption;
    },
};

export default PaymentOption;
