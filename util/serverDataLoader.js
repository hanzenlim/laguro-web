import fetch from 'node-fetch';

import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { parse } from 'graphql';

const uri = process.env.GRAPHQL_URL;

const link = createHttpLink({
    uri,
    fetch,
    headers: {
        'x-api-key': process.env.GRAPHQL_SECRET_KEY,
    },
});

module.exports.getUserQuery = `
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            dentistId
            firstName
            lastName
            imageUrl
            email
            intercomHash
            isDentist
            isHost
        }
    }
`;

module.exports.getUserByGoogleIdQuery = `
    query getUserByGoogleId($googleId: String!) {
        getUserByGoogleId(googleId: $googleId) {
            id
            dentistId
            firstName
            lastName
            googleId
            imageUrl
            email
            intercomHash
            isDentist
            isHost
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
        email
        intercomHash
        pin {
            value
            expiry
        }
        isDentist
        isHost
    }
}
`;

module.exports.createGoogleUserQuery = `
    mutation createGoogleUser($input: CreateGoogleUserInput!) {
        createGoogleUser(input: $input) {
            id
            firstName
            middleName
            lastName
            imageUrl
            dentistId
            googleId
            password
            email
            intercomHash
            isDentist
            isHost
        }
    }
`;

module.exports.updateUserQuery = `
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            firstName
            middleName
            lastName
            imageUrl
            dentistId
            googleId
            password
            email
            intercomHash
            isDentist
            isHost
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
            email
            intercomHash
            isDentist
            isHost
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

module.exports.updateUserVariable = (id, googleId) => ({
    input: {
        id,
        googleId,
    },
});

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
    middleName,
    lastName,
    password,
    email
) => ({
    input: {
        firstName,
        middleName,
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

const makeGraphQLRequest = async (query, variables, context = {}) => {
    const result = makePromise(
        execute(link, {
            query: parse(query),
            variables,
            context,
        })
    );

    return result;
};

module.exports.makeQuery = makeGraphQLRequest;

module.exports.makeMutation = makeGraphQLRequest;
