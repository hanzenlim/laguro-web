import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import cookies from 'browser-cookies';
import { hot } from 'react-hot-loader';

import App from './App';

import UIResolver from './resolvers/ui';
import { LAGURO_AUTH_TOKEN } from './util/strings';

const cache = new InMemoryCache();

const { defaults, resolvers } = UIResolver;

const client = new ApolloClient({
    clientState: {
        defaults,
        resolvers,
    },
    uri: process.env.REACT_APP_API_URL,
    cache,
    request: async operation => {
        const token = cookies.get(LAGURO_AUTH_TOKEN);

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
