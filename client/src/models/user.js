import makeApiCall from '../util/clientDataLoader';
import { DENTIST } from '../util/strings';
import { userFragment, dentistFragment } from '../util/fragments';

// TODO organizing graphql in this manner does not work well when the desired
// data is nested at a level > 1. Consider another option, this is just a stopgap,
const generateGetUserQuery = options => {
    const dentistResult = options.includes(DENTIST)
        ? `dentist {${dentistFragment}}`
        : '';
    return `
        query getUserByGoogleId($googleId: String!) {
            getUserByGoogleId(googleId: $googleId) {
                ${userFragment}
                ${dentistResult}
            }
        }
    `;
};

const updateUserQuery = `
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            ${userFragment}
        }
    }
`;

const getUserVariable = id => ({
    googleId: id.toString()
});

// TODO handle graphql errors
const User = {
    getByGoogleId: async (userId, options) => {
        const getUserQuery = generateGetUserQuery(options);
        const response = await makeApiCall(
            getUserQuery,
            getUserVariable(userId)
        );
        return response.data.getUserByGoogleId;
    },
    updateProfileImage: async (userId, imageUrl) => {
        const response = await makeApiCall(updateUserQuery, {
            input: { id: userId, imageUrl }
        });
        return response.data.updateUser;
    }
};

export default User;
