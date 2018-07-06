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
        ? `payoutLoginLink`
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

// TODO organizing graphql in this manner does not work well when the desired
// data is nested at a level > 1. Consider another option, this is just a stopgap,
const generateGetUserQuery = (options = []) => {
    return `
        query getUserByGoogleId($googleId: String!) {
            getUserByGoogleId(googleId: $googleId) {
                ${generateUserResult(options)}
            }
        }
    `;
};

const generateUpdateUserQuery = (options = []) => {
    return `
        mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
                ${generateUserResult(options)}
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

const getUserVariable = id => ({
    userId: id.toString()
});

const generateGetUserByUserIdQuery = `
    query ($id: String!) {
        getUser(id: $id) {
            ${userFragment}
            paymentOptions {${paymentOptionFragment}}
        }
    }
`;

// TODO handle graphql errors
const User = {
    getByUserId: async userId => {
        if (!userId) {
            return null;
        }
        const response = await makeApiCall(generateGetUserByUserIdQuery, {
            id: userId
        });
        return response.data.getUser;
    },
    getByGoogleId: async (userId, ...options) => {
        const getUserQuery = generateGetUserQuery(options);
        const response = await makeApiCall(
            getUserQuery,
            getUserVariable(userId)
        );
        return response.data.getUserByGoogleId;
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
