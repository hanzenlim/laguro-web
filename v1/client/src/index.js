import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { merge } from 'lodash';

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
const ApolloApp = AppComponent => (
    <ApolloProvider client={client}>
        <AppComponent />
    </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));
