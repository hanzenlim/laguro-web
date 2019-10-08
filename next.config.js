require('dotenv').config();

/* eslint-disable */
const withCss = require('@zeit/next-css');
const path = require('path');
const Dotenv = require('dotenv-webpack');
// NOTE: Remove withImages temporarily because it is breaking null images from graphql
// if this breaks any UI, please revisit this issue
// const withImages = require('next-images');

const BrotliPlugin = require('brotli-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = withCss({
    webpack: (config, { isServer }) => {
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

        config.optimization.minimizer = [];
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

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

            new BrotliPlugin({
                asset: '[path].br[query]',
                test: /\.(js|css|html|svg)$/,
                minRatio: 0.8,
            }),
        ];

        return config;
    },
    // target: 'serverless',
    onDemandEntries: {
        // This governs the behavior of the development server ONLY
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 5 * 60 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 10,
    },
});
