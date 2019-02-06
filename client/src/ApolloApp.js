import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import cookies from 'browser-cookies';
import { merge } from 'lodash';
import { hot } from 'react-hot-loader';
import _get from 'lodash/get';

import App from './App';

import AuthResolver from './resolvers/auth';
import UIResolver from './resolvers/ui';

const cache = new InMemoryCache();

const { defaults, resolvers } = merge(AuthResolver, UIResolver);

const client = new ApolloClient({
    clientState: {
        defaults,
        resolvers,
    },
    uri: process.env.REACT_APP_API_URL,
    cache,
    request: async operation => {
        let user = cookies.get('user');
        if (user) {
            user = JSON.parse(user);
        }

        const token = _get(user, 'token');
        operation.setContext({
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });
    },
});

// eslint-disable-next-line
console.log('client::', client);
const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default hot(module)(ApolloApp);
