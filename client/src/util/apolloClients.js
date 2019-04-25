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
    uri: process.env.REACT_APP_API_URL,
    request: requestHandler,
});