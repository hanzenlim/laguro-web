import cookies from 'browser-cookies';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import _get from 'lodash/get';

import { LAGURO_AUTH_TOKEN } from './strings';
import { onTokenExpiryLogout } from './authUtils';

function getClient({ uri }) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        const graphQLErrorMessage = _get(graphQLErrors, '[0].message', '');

        if (
            graphQLErrorMessage &&
            graphQLErrorMessage.includes('jwt expired')
        ) {
            onTokenExpiryLogout();
        }

        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const authLink = setContext((_, { headers }) => {
        const token = cookies.get(LAGURO_AUTH_TOKEN);
        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    const checkpointLinks = ApolloLink.from([errorLink, authLink]);
    const httpLink = createHttpLink({ uri });

    return new ApolloClient({
        link: checkpointLinks.concat(httpLink),
        connectToDevTools: true,
        cache: new InMemoryCache(),
    });
}

export const defaultClient = getClient({
    uri: process.env.REACT_APP_GRAPHQL_LAGURO_API,
});

export const insuranceClient = getClient({
    uri: process.env.REACT_APP_GRAPHQL_INSURANCE_API,
});

export const appointmentClient = getClient({
    uri: process.env.REACT_APP_GRAPHQL_APPOINTMENT_API,
});

export const walletClient = getClient({
    uri: process.env.REACT_APP_GRAPHQL_WALLET_API,
});

export const pricingClient = getClient({
    uri: process.env.REACT_APP_sGRAPHQL_PRICING_API,
});
