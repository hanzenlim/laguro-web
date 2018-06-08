const createApolloFetch = require('apollo-fetch').createApolloFetch;

const uri = process.env.NODE_ENV === "production" && process.env.GRAPHQL_URL? 
    process.env.GRAPHQL_URL :
    'http://localhost:4000/graphql';

const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
    options.credentials = 'same-origin';

    if (process.env.NODE_ENV === "production") {
        if (!options.headers) {
            options.headers = {};
        }

        options.headers['x-api-key'] = process.env.GRAPHQL_SECRET_KEY;
    }

    next();
});

module.exports.getUserQuery = `
    query getUserByGoogleId($googleId: String!) {
        getUserByGoogleId(googleId: $googleId) {
            id
            name
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
            imageUrl
        }
    }
`;

module.exports.createUserVariable = (name, id, img) => ({ 
	"input": {
		name: name,
		googleId: id,
		imageUrl: img
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
