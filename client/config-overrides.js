const path = require('path');
const {
    override,
    fixBabelImports,
    addWebpackAlias,
    addWebpackResolve,
} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addWebpackAlias({
        '@ant-design/icons/lib/dist$': path.resolve(
            __dirname,
            './src/icons.js'
        ),
    }),
    addWebpackResolve({
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    })
);
