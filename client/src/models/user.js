import makeApiCall from '../util/clientDataLoader';
import {
    APPOINTMENTS,
    DENTIST,
    PAYMENT_OPTIONS,
    PAYOUT_LOGIN
} from '../util/strings';
import {
    appointmentFragment,
    userFragment,
    dentistFragment,
    paymentOptionFragment
} from '../util/fragments';

const generateUserResult = options => {
    const dentistResult = options.includes(DENTIST)
        ? `dentist {${dentistFragment}}`
        : '';
    const paymentOptionsResult = options.includes(PAYMENT_OPTIONS)
        ? `paymentOptions {${paymentOptionFragment}}`
        : '';
    const loginLinkResult = options.includes(PAYOUT_LOGIN)
        ? 'payoutLoginLink'
        : '';
    const appointmentResult = options.includes(APPOINTMENTS)
        ? `appointments {${appointmentFragment}}`
        : '';
    const result = `
        ${userFragment}
        ${dentistResult}
        ${paymentOptionsResult}
        ${loginLinkResult}
        ${appointmentResult}
    `;
    return result;
};

const generateUpdateUserQuery = () => {
    return `
        mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
                ${userFragment}
                paymentOptions {${paymentOptionFragment}}
            }
        }
    `;
};

const addPayoutAccountQuery = `
    mutation AddPayoutAccount($input: AddPayoutAccountInput!) {
        addPayoutAccount(input: $input) {
            ${userFragment}
            payoutLoginLink
        }
    }
`;

const generateGetUserQuery = (options = []) => {
    return `
        query ($id: String!) {
            getUser(id: $id) {
                ${generateUserResult(options)}
            }
        }
    `;
};

// TODO handle graphql errors
const User = {
    get: async (userId, ...options) => {
        const getUserQuery = generateGetUserQuery(options);
        const response = await makeApiCall(getUserQuery, { id: userId });
        return response.data.getUser;
    },
    updateProfile: async (userId, profile) => {
        const updateUserQuery = generateUpdateUserQuery();
        const response = await makeApiCall(updateUserQuery, {
            input: { id: userId, ...profile }
        });
        return response.data.updateUser;
    },
    addPayoutAccount: async (userId, accountToken) => {
        const response = await makeApiCall(addPayoutAccountQuery, {
            input: { userId, accountToken }
        });
        return response.data.addPayoutAccount;
    }
};

export default User;
