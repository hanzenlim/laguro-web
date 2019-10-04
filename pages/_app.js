import App from 'next/app';
import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import cookies from 'browser-cookies';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import { IntlProvider } from 'react-intl';

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
    render() {
        return <LaguroApp {...this.props} />;
    }
}

function LaguroApp({ Component, pageProps, apolloClient, locale, messages }) {
    const [isAuth, setIsAuth] = useState(false);
    const [mounted, setMounted] = useState(false);
    const loginModalContextValue = useLogin();

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
        <IntlProvider locale={locale} messages={messages}>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    <AppContextProvider value={{ isAuth, mounted, setIsAuth }}>
                        <LoginContextProvider value={loginModalContextValue}>
                            <Head>
                                <meta charset="utf-8" />
                                <meta
                                    name="viewport"
                                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                                />
                                <meta name="theme-color" content="#000000" />
                                <link
                                    rel="preload"
                                    href="/static/fonts/silka/silka-regular-webfont.woff2"
                                    as="font"
                                    type="font/woff2"
                                    crossOrigin="true"
                                />
                                <link
                                    href="https://www.google-analytics.com"
                                    rel="preconnect"
                                    crossOrigin="true"
                                />
                                <link
                                    href="https://www.googletag</link>manager.com"
                                    rel="preconnect"
                                    crossOrigin="true"
                                />
                                <script
                                    id="stripe-js"
                                    src="https://js.stripe.com/v3/"
                                    async
                                />
                                <link
                                    rel="icon"
                                    type="image/png"
                                    sizes="32x32"
                                    href="/static/images/favicon-32x32.png"
                                />
                                <link
                                    rel="icon"
                                    type="image/png"
                                    sizes="16x16"
                                    href="/static/images/fav</link>icon-16x16.png"
                                />
                                <script
                                    dangerouslySetInnerHTML={{
                                        __html: `(function (i, s, o, g, r, a, m, n) {
                                        i['moengage_object'] = r; t = {}; q = function (f) { return function () { (i['moengage_q'] = i['moengage_q'] || []).push({ f: f, a: arguments }); }; };
                                        f = ['track_event', 'add_user_attribute', 'add_first_name', 'add_last_name', 'add_email', 'add_mobile',
                                            'add_user_name', 'add_gender', 'add_birthday', 'destroy_session', 'add_unique_user_id', 'moe_events', 'call_web_push', 'track', 'location_type_attribute'];
                                        for (k in f) { t[f[k]] = q(f[k]); }
                                        a = s.createElement(o); m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
                                        i['moe'] = i['moe'] || function () { n = arguments[0]; return t; }; a.onload = function () { if (n) { i[r] = moe(n); } };
                                        })(window, document, 'script', 'https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js', 'Moengage');`,
                                    }}
                                />
                                <script
                                    dangerouslySetInnerHTML={{
                                        __html: `Moengage = moe({
                                        app_id: "${process.env.REACT_APP_MOENGAGE_KEY}",
                                        debug_logs: 0
                                        });`,
                                    }}
                                />
                                <script
                                    dangerouslySetInnerHTML={{
                                        __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
                                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                        })(window,document,'script','dataLayer','${process.env.REACT_APP_GTM_TRACKING_ID}')`,
                                    }}
                                />
                                <noscript>
                                    <iframe
                                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.REACT_APP_GTM_TRACKING_ID}`}
                                        height="0"
                                        width="0"
                                        title="app_gtm_tracker"
                                    />
                                </noscript>
                                <script
                                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`}
                                    async
                                />
                            </Head>
                            <Layout>
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
