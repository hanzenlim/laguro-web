const createApolloFetch = require('apollo-fetch').createApolloFetch;

const uri = process.env.GRAPHQL_URL;

const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
    options.credentials = 'same-origin';

    if (!options.headers) {
        options.headers = {};
    }

    options.headers['x-api-key'] = process.env.GRAPHQL_SECRET_KEY;
    next();
});

module.exports.getUserQuery = `
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            firstName
            lastName
            imageUrl
        }
    }
`;

module.exports.getUserByGoogleIdQuery = `
    query getUserByGoogleId($googleId: String!) {
        getUserByGoogleId(googleId: $googleId) {
            id
            firstName
            lastName
            googleId
            imageUrl
        }
    }
`;

module.exports.getUserByEmailQuery = `
    query getUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            id
            firstName
            middleName
            lastName
            imageUrl
            dentistId
            googleId
            password
        }
    }
`;

module.exports.getUserByGoogleIdVariable = id => ({
    googleId: id.toString(),
});

module.exports.getResetPasswordRequestQuery = `
    query getResetPasswordRequest($id: String!) {
        getResetPasswordRequest(id: $id) {
            id
            email
            status
        }
    }
`;

module.exports.getUserVariable = id => ({
    id: id.toString(),
});

module.exports.getUserByEmailVariable = email => ({
    email,
});

module.exports.getResetPasswordRequestVariable = id => ({
    id: id.toString(),
});

module.exports.createGoogleUserQuery = `
    mutation createGoogleUser($input: CreateGoogleUserInput!) {
        createGoogleUser(input: $input) {
            id
            googleId
            email
            imageUrl
        }
    }
`;

module.exports.createLocalUserQuery = `
    mutation createLocalUser($input: CreateLocalUserInput!) {
        createLocalUser(input: $input) {
            id
            firstName
            middleName
            lastName
            imageUrl
            dentistId
            googleId
            password
        }
    }
`;

module.exports.updatePatientDocumentSignatureQuery = `
    mutation updatePatientDocumentSignature($input: UpdatePatientDocumentSignatureInput!) {
        updatePatientDocumentSignature(input: $input) {
            signatureRequestId
        }
    }
`;

module.exports.createResetPasswordRequestQuery = `
    mutation createResetPasswordRequest($input: CreateResetPasswordRequestInput!) {
        createResetPasswordRequest(input: $input) {
            email
        }
    }
`;

module.exports.useResetPasswordRequestQuery = `
    mutation useResetPasswordRequest($input: UseResetPasswordRequestInput!) {
        useResetPasswordRequest(input: $input) {
            id
            email
            status
        }
    }
`;

module.exports.createGoogleUserVariable = (
    firstName,
    lastName,
    id,
    email,
    img
) => ({
    input: {
        firstName,
        lastName,
        googleId: id,
        email,
        imageUrl: img,
    },
});

module.exports.createLocalUserVariable = (
    firstName,
    lastName,
    password,
    email
) => ({
    input: {
        firstName,
        lastName,
        password,
        email,
    },
});

module.exports.updatePatientDocumentSignatureVariable = signatureRequestId => ({
    input: {
        signatureRequestId,
    },
});

module.exports.createResetPasswordRequestVariable = email => ({
    input: {
        email,
    },
});

module.exports.useResetPasswordRequestVariable = (id, token, password) => ({
    input: {
        id,
        token,
        password,
    },
});

module.exports.makeQuery = async (query, variables) => {
    const result = await apolloFetch({
        query,
        variables,
    });

    return result;
};

module.exports.makeMutation = async (query, variables) => {
    const result = await apolloFetch({
        query,
        variables,
    });

    return result;
};
