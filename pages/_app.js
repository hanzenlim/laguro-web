import App from 'next/app';
import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import cookies from 'browser-cookies';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import { IntlProvider } from 'react-intl';
import Router from 'next/router';

import withApolloClient from '~/lib/withApolloClient';
import Layout from '~/components/Layout';
import Content from '~/components/Content';
import theme from '~/components/theme';
import {
    AppContextProvider,
    LoginContextProvider,
    useLogin,
} from '~/appContext';
import Footer from '~/common/Footer';
import Header from '~/common/Header';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

html {
    font-family: 'Silka', sans-serif;
}

*:focus {
    outline: none;
}

[role="button"] {
    cursor: pointer;
}

@media print {
    .ant-modal {
        margin: 0;
        border: none;
        box-shadow: none;
    }

    .ant-modal-content {
        box-shadow: none;
    }

    .ant-modal-close-x * {
        display: none;
    }

    .print-btn * {
        display: none;
    }
}

.ant-message .ant-message-info span {
    font-size: 60px
}

.ant-message .ant-message-info i {
    font-size: 60px;
}

#fsp-fileUpload {
    height: 1px !important;
    width: 1px !important;
}

/* ----------- iPad Pro 12.9" ----------- */
/* Landscape */
/* Declare the same value for min- and max-width to avoid colliding with desktops */
/* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
@media only screen
and (min-device-width: 1024px)
and (max-device-width: 1024px)
and (orientation: landscape)
and (-webkit-min-device-pixel-ratio: 2) {
    .kiosk-reg-page, .kiosk-pages {
        zoom: 150%;
    }

}

/* ----------- iPad Pro 10.5" ----------- */
/* ----------- Landscape mode" ----------- */
@media only screen
and (min-device-width: 1112px)
and (max-device-width: 1112px)
and (orientation: landscape)
and (-webkit-min-device-pixel-ratio: 2) {
    html {
        zoom: 150%;
    }

}

`;

class ExtendedApp extends App {
    componentDidMount() {
        Router.beforePopState(({ as }) => {
            location.href = as;
        });
    }
    render() {
        return <LaguroApp {...this.props} />;
    }
}

function LaguroApp({ Component, pageProps, apolloClient, locale, messages }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const loginModalContextValue = useLogin();

    Router.onRouteChangeStart = () => setIsLoading(true);
    Router.onRouteChangeComplete = () => setIsLoading(false);
    Router.onRouteChangeError = () => setIsLoading(false);

    const checkAuth = () => {
        const user = cookies.get('user');

        if (!_isEmpty(user)) {
            setIsAuth(true);
        }

        setMounted(true);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const withUserProps = { ...pageProps, isAuth };

    return (
        <IntlProvider locale={locale || 'en'} messages={messages}>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    <AppContextProvider value={{ isAuth, mounted, setIsAuth }}>
                        <LoginContextProvider value={loginModalContextValue}>
                            <Layout isLoading={isLoading}>
                                <Header {...loginModalContextValue} />
                                <Content>
                                    <Component
                                        {...withUserProps}
                                        {...loginModalContextValue}
                                    />
                                </Content>
                                <Footer />
                            </Layout>
                            <GlobalStyle />
                        </LoginContextProvider>
                    </AppContextProvider>
                </ThemeProvider>
            </ApolloProvider>
        </IntlProvider>
    );
}

export default withApolloClient(ExtendedApp);
