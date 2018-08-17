import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: process.env.REACT_APP_API_URL });

console.log('client::', client);
const ApolloApp = AppComponent => (
    <ApolloProvider client={client}>
        <AppComponent />
    </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));
