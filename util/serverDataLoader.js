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

module.exports.getUserVariable = (id) => ({
    googleId: id.toString()
});

module.exports.createUserQuery = `
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            googleId
            email
            imageUrl
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

module.exports.createUserVariable = (firstName, lastName, id, email, img) => ({
    "input": {
        firstName,
        lastName,
        googleId: id,
        email,
        imageUrl: img
    }
});

module.exports.updatePatientDocumentSignatureVariable = (signatureRequestId) => ({
    "input": {
        signatureRequestId: signatureRequestId,
    }
});


module.exports.makeQuery = async (query, variables) => {
    let result = await apolloFetch({
        query,
        variables
    });

    return result;
}

module.exports.makeMutation = async (query, variables) => {
    let result = await apolloFetch({
        query,
        variables
    });

    return result;
}
