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
                <InlineStylesHead />
                <body>
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
