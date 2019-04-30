import cookies from 'browser-cookies';
import ApolloClient from 'apollo-boost';
import { LAGURO_AUTH_TOKEN } from './strings';

const requestHandler = async operation => {
    const token = cookies.get(LAGURO_AUTH_TOKEN);
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
};

export const defaultClient = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_LAGURO_API,
    request: requestHandler,
});

export const insuranceClient = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_INSURANCE_API,
    request: requestHandler,
});

export const appointmentClient = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_APPOINTMENT_API,
    request: requestHandler,
});
