const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line import/no-extraneous-dependencies
const slsw = require('serverless-webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    externals: [nodeExternals()],
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    optimization: {
        // We no not want to minimize our code.
        minimize: true
    },
    performance: {
        // Turn off size warnings for entry points
        hints: "warning"
    },
    devtool: 'nosources-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: __dirname,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ["es2015", "react-app", "stage-2"],
                            plugins: ["css-modules-transform"]
                        },
                    },
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 8000,
                      name: "images/[hash]-[name].[ext]"
                    }
                  }
                ]
              }
        ],
    },
    plugins: [
        new CopyWebpackPlugin([{ from: "client/build", to: "build" }], {
          debug: "info"
        })
    ]
};
