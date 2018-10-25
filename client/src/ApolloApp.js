import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { merge } from 'lodash';
import { hot } from 'react-hot-loader';

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
});

// eslint-disable-next-line
console.log('client::', client);
const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default hot(module)(ApolloApp);
