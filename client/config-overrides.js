const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
    config = rewireReactHotLoader(config, env);
    config = injectBabelPlugin(
        [
            'import',
            { libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
        ],
        config
    );
    const alias = config.resolve.alias || {};
    alias['@ant-design/icons/lib/dist$'] = path.resolve(
        __dirname,
        './src/icons.js'
    );

    config.resolve.alias = alias;
    return config;
};
