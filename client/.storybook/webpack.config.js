const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
                include: [
                    path.resolve('./node_modules'),
                    path.resolve('./src'),
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },
    resolve: {
        modules: [path.resolve('./node_modules')],
    },
};
