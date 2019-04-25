import cookies from 'browser-cookies';
import ApolloClient from 'apollo-boost';
import { LAGURO_AUTH_TOKEN } from './strings';

const requestHandler = async (operation) => {
    const token = cookies.get(LAGURO_AUTH_TOKEN);
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        },
    });
};

export const defaultClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    request: requestHandler,
});

export const insuranceClient = new ApolloClient({
    uri: 'http://localhost:5001/graphql',
    request: requestHandler,
});