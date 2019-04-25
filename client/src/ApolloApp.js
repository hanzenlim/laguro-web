import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader';
import App from './App';
import {defaultClient} from './util/apolloClients';

const ApolloApp = () => (
    <ApolloProvider client={defaultClient}>
        <App />
    </ApolloProvider>
);

export default hot(module)(ApolloApp);
