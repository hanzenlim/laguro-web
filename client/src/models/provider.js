// Provider is the open dental term for dentist. We maintain this term
// to make it clear that operations in this file are specific to OD

import makeApiCall from '../util/clientDataLoader';

const SUCCESS_MESSAGE = 'credentials updated';

const resetProviderPasswordQuery = `
    mutation resetPassword($input: ResetProviderPasswordInput!) {
        resetProviderPassword(input: $input) {
            message
        }
    }
`;

const Provider = {
    resetPassword: async id => {
        const response = await makeApiCall(resetProviderPasswordQuery, {
            input: { id },
        });
        const { message } = response.data.resetProviderPassword;
        if (message !== SUCCESS_MESSAGE) {
            throw new Error('Failed to reset Open Dental passsword.');
        }
        return message;
    },
};

export default Provider;
