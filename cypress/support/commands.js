import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { registerForm } from '../utils';

const cache = new InMemoryCache();
const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache,
});

Cypress.Commands.add('registerNewUser', () => {
    const user = registerForm();
    const authUrl = 'http://localhost:3000/api/signup';

    return cy
        .log('resigter a test new user', user)
        .request('POST', authUrl, user)
        .then(({ body }) => {
            client.writeData({
                data: {
                    activeUser: {
                        ...body.user,
                        __typename: 'ActiveUser',
                    },
                    visibleModal: null,
                },
            });
            return Object.assign({}, body.user);
        });
});
