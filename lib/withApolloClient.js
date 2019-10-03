import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';
import cookie from 'cookie';

import initApollo from './initApollo';

function parseCookies(req, options = {}) {
    return cookie.parse(
        req ? req.headers.cookie || '' : document.cookie,
        options
    );
}

export default App =>
    class Apollo extends React.Component {
        static displayName = `WithData(${App.displayName})`;
        static async getInitialProps(ctx) {
            const {
                AppTree,
                ctx: { req, res },
            } = ctx;

            let appProps = {};
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(ctx);
            }
            const { locale, messages } = req || window.__NEXT_DATA__.props;

            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            const apollo = initApollo(
                {},
                {
                    getToken: () => parseCookies(req).token,
                }
            );
            if (typeof window === 'undefined') {
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <AppTree {...appProps} apolloClient={apollo} />
                    );
                } catch (error) {
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                    console.error(
                        'Error while running `getDataFromTree`',
                        error
                    );
                }

                // getDataFromTree does not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                Head.rewind();
            }

            // Extract query data from the Apollo store
            const apolloState = apollo.cache.extract();

            return {
                ...appProps,
                apolloState,
                locale,
                messages,
            };
        }

        constructor(props) {
            super(props);

            this.apolloClient = initApollo(props.apolloState, {
                getToken: () => parseCookies().token,
            });
        }

        render() {
            return <App apolloClient={this.apolloClient} {...this.props} />;
        }
    };
