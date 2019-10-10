import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { readFileSync } from 'fs';
import { join } from 'path';

class InlineStylesHead extends Head {
    getCssLinks() {
        return this.__getInlineStyles();
    }

    __getInlineStyles() {
        const { assetPrefix, files } = this.context._documentProps;
        if (!files || files.length === 0) return null;

        return files
            .filter(file => /\.css$/.test(file))
            .map(file => (
                <style
                    key={file}
                    data-href={`${assetPrefix}/_next/${file}`}
                    dangerouslySetInnerHTML={{
                        __html: readFileSync(
                            join(process.cwd(), '.next', file),
                            'utf-8'
                        ),
                    }}
                />
            ));
    }
}

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        const {
            req: { locale, localeDataScript },
        } = ctx;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                locale,
                localeDataScript,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        // Polyfill Intl API for older browsers
        const polyfill = `https://cdn.polyfill.io/v3/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;

        return (
            <html lang="en">
                <InlineStylesHead>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
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
                    <script
                        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`}
                        async
                        defer
                    />
                </InlineStylesHead>
                <body>
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${process.env.REACT_APP_GTM_TRACKING_ID}`}
                            height="0"
                            width="0"
                            title="app_gtm_tracker"
                        />
                    </noscript>
                    <Main />
                    <script src={polyfill} />
                    <script
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: this.props.localeDataScript,
                        }}
                    />
                    <NextScript />
                </body>
            </html>
        );
    }
}
