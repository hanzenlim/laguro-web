import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import cookies from 'browser-cookies';
import { hot } from 'react-hot-loader';

import App from './App';

import { LAGURO_AUTH_TOKEN } from './util/strings';

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    request: async operation => {
        const token = cookies.get(LAGURO_AUTH_TOKEN);
        operation.setContext({
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });
    },
});

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default hot(module)(ApolloApp);
