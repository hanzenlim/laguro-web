import fetch from 'isomorphic-unfetch';
import browserCookies from 'browser-cookies';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import _get from 'lodash/get';

import { onTokenExpiryLogout } from '../util/authUtils';

let apolloClient = null;

if (typeof window === 'undefined') {
    global.fetch = fetch;
}

function create(initialState, { getToken, fetchOptions }) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    const isBrowser = typeof window !== 'undefined';

    const createLaguroClientLink = ({ uri }) => {
        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (typeof window !== 'undefined') {
                const graphQLErrorMessage = _get(
                    graphQLErrors,
                    '[0].message',
                    ''
                );

                if (
                    graphQLErrorMessage &&
                    graphQLErrorMessage.includes('jwt expired')
                ) {
                    onTokenExpiryLogout();
                }

                if (networkError)
                    console.log(`[Network error]: ${networkError}`);
            }
        });

        const authLink = setContext((_, { headers }) => {
            let token = '';

            if (typeof window !== 'undefined') {
                token = browserCookies.get('laguroAuthToken');
            } else {
                token = getToken();
            }

            return {
                headers: {
                    ...headers,
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
        });

        const checkpointLinks = ApolloLink.from([errorLink, authLink]);
        const httpLink = createHttpLink({
            uri,
            fetchOptions,
        });

        return checkpointLinks.concat(httpLink);
    };

    const laguroHttpLink = createLaguroClientLink({
        uri: process.env.REACT_APP_GRAPHQL_LAGURO_API,
    });

    const insuranceHttpLink = createLaguroClientLink({
        uri: process.env.REACT_APP_GRAPHQL_INSURANCE_API,
    });

    const appointmentHttpLink = createLaguroClientLink({
        uri: process.env.REACT_APP_GRAPHQL_APPOINTMENT_API,
    });

    const walletHttpLink = createLaguroClientLink({
        uri: process.env.REACT_APP_GRAPHQL_WALLET_API,
    });

    const pricingHttpLink = createLaguroClientLink({
        uri: process.env.REACT_APP_GRAPHQL_PRICING_API,
    });

    const pricingLink = ApolloLink.split(
        operation => operation.getContext().clientName === 'pricing',
        pricingHttpLink,
        laguroHttpLink
    );

    const walletLink = ApolloLink.split(
        operation => operation.getContext().clientName === 'wallet',
        walletHttpLink,
        pricingLink
    );

    const appointmentLink = ApolloLink.split(
        operation => operation.getContext().clientName === 'appointment',
        appointmentHttpLink,
        walletLink
    );

    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.split(
            operation => operation.getContext().clientName === 'insurance',
            insuranceHttpLink,
            appointmentLink
        ),
        fetch: !isBrowser && fetch,
        cache: new InMemoryCache().restore(initialState || {}),
    });
}

export default function initApollo(initialState, options) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        let fetchOptions = {};
        // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
        // 'https-proxy-agent' is required here because it's a sever-side only module
        if (process.env.https_proxy) {
            fetchOptions = {
                agent: new (require('https-proxy-agent'))(
                    process.env.https_proxy
                ),
            };
        }
        return create(initialState, {
            ...options,
            fetchOptions,
        });
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options);
    }

    return apolloClient;
}
