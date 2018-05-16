import { createApolloFetch } from 'apollo-fetch';

const uri =
    process.env.NODE_ENV === 'production'
        ? 'http://prod-placeholder.com'
        : 'http://localhost:3000/api/graphql';
const apolloFetch = createApolloFetch({ uri });

/* eslint no-unused-vars: ["error", { "args": "none" }] */
apolloFetch.use(({ request, options }, next) => {
    options.credentials = 'include';
    next();
});

const makeApiCall = async (query, variables) => {
    const result = await apolloFetch({
        query,
        variables
    });

    return result;
};

export default makeApiCall;
