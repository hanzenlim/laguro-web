const path = require('path');
require('dotenv').config(process.env.LAGURO_USE_CUSTOM_DOTENV_FILE === "1" ? { path: path.resolve(process.cwd(), '._env') } : null);

const withCss = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withProgressBar = require('next-progressbar');
const BrotliPlugin = require('brotli-webpack-plugin');

const nextConfig = {
    webpack: (config, { isServer, dev }) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style\/css.*?/;
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback();
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback);
                    } else {
                        callback();
                    }
                },
                ...(typeof origExternals[0] === 'function'
                    ? []
                    : origExternals),
            ];

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            });
        }

        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]',
                },
            },
        });

        config.plugins = config.plugins || [];

        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true,
            }),
        ];

        if (!dev) {
            config.plugins.push(
                new BrotliPlugin({
                    asset: '[path].br[query]',
                    test: /\.(js|css|html|svg)$/,
                    minRatio: 0.8,
                })
            );
        }

        return config;
    },
    onDemandEntries: {
        // This governs the behavior of the development server ONLY
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 5 * 60 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 10,
    },
};

module.exports = withPlugins(
    [
        withBundleAnalyzer,
        withCss,
        [
            withProgressBar,
            {
                progressBar: {
                    // Enable line below when needed. Disabled for performance boost
                    // profile: true,
                },
            },
        ],
    ],
    nextConfig
);
