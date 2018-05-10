import { createApolloFetch } from 'apollo-fetch';

const uri = process.env.NODE_ENV === "production" ? 
    'http://prod-placeholder.com' : 'http://localhost:4000/graphql';
const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
    options.credentials = 'same-origin';
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

export const getUserVariable = (id) => ({
	googleId: id.toString()
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
	"input": {
		name: name,
		googleId: id,
		imageUrl: img
	}
});

export const makeQuery = async (query, variables) => {
    let result = await apolloFetch({
        query,
        variables
    });

    return result;
}

export const makeMutation = async (query, variables) => {
    let result = await apolloFetch({
        query,
        variables
    });

    return result;
}
