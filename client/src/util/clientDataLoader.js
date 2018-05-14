import { createApolloFetch } from 'apollo-fetch';

const uri = process.env.NODE_ENV === 'production' ?
    'http://prod-placeholder.com' : 'http://localhost:3000/api/graphql';
const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ options }, next) => {
    options.credentials = 'include';
    next();
});

export const getUserQuery = `
    query getUserByGoogleId($googleId: String!) {
        getUserByGoogleId(googleId: $googleId) {
            id
            name
            googleId
            imageUrl
        }
    }
`;

export const getUserVariable = id => ({
    googleId: id.toString(),
});

export const createUserQuery = `
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            googleId
            imageUrl
        }
    }
`;

export const createUserVariable = (name, id, img) => ({
    input: {
        name,
        googleId: id,
        imageUrl: img,
    },
});

export const makeQuery = async (query, variables) => {
    const result = await apolloFetch({
        query,
        variables,
    });

    return result;
};

export const makeMutation = async (query, variables) => {
    const result = await apolloFetch({
        query,
        variables,
    });

    return result;
};
