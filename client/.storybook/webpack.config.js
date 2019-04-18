const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
        f => f.test.toString() !== '/\\.css$/'
    );

    // Make whatever fine-grained changes you need
    config.module.rules.push({
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: [path.resolve('./node_modules'), path.resolve('./src')],
    });

    config.module.rules.push({
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
    });

    config.module.rules.push({
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
    });

    config.resolve.modules = [
        path.resolve('./node_modules'),
        path.resolve(
            './node_modules/@laguro/the-bright-side-components/node_modules'
        ),
    ];

    // Return the altered config
    return config;
};
