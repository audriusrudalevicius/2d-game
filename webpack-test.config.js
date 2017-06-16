const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, 'src');
const TEST_ROOT = path.resolve(__dirname, 'test');

module.exports = {
    context: ROOT,
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            TEST_ROOT,
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'awesome-typescript-loader'
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    devServer: {}
};
