const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CLIENT_ROOT = path.resolve(__dirname, 'src/client');
const SERVER_ROOT = path.resolve(__dirname, 'src/server');
const SHARED_ROOT = path.resolve(__dirname, 'src/shared');
const CLIENT_DESTINATION = path.resolve(__dirname, 'dist');
const SERVER_DESTINATION = path.resolve(__dirname, 'dist');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.CIRCLE_BUILD_NUM = process.env.CIRCLE_BUILD_NUM || 'dev';

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const commonRules = [
    {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
    },
    {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
    },
    {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader'
    }
];

const commonExt = ['.ts', '.js'];

const webPlugins = [
    new CopyWebpackPlugin([{from: CLIENT_ROOT + '/assets', to: 'assets'}]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons.js',
        minChunks: 2
    }),
    new webpack.DefinePlugin({
        'window.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'window.CIRCLE_BUILD_NUM': JSON.stringify(process.env.CIRCLE_BUILD_NUM)
    })
];
const webPluginsDev = [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: CLIENT_ROOT + '/index.ejs',
        inject: false,
        chunksSortMode: "dependency",
        title: 'Development'
    })
];
const webPluginsProd = [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: CLIENT_ROOT + '/index.ejs',
        inject: false,
        minify: {
            html5: true,
            removeTagWhitespace: true,
            collapseWhitespace: true,
            minifyJS: true,
            removeEmptyAttributes: true,
            useShortDoctype: true
        },
        googleAnalytics: {
            trackingId: 'UA-15104439-7',
            pageViewOnLoad: true
        },
        rollbarConfig: {
            accessToken: "1847f7600a664f34b37a6f9b01531a93",
            version: JSON.stringify(process.env.CIRCLE_BUILD_NUM),
            captureUncaught: true,
            captureUnhandledRejections: true,
            payload: {
                environment: JSON.stringify(process.env.NODE_ENV)
            }
        },
        chunksSortMode: "dependency",
        hash: true,
        title: 'Bomba'
    }),
    new webpack.optimize.UglifyJsPlugin()
];

module.exports = [
    {
        target: "web",
        name: "client",
        context: CLIENT_ROOT,
        entry: {
            'main': './main.ts'
        },
        output: {
            filename: '[name].bundle.js',
            path: CLIENT_DESTINATION,
            chunkFilename: '[id].bundle.js'
        },
        resolve: {
            extensions: commonExt,
            modules: [
                CLIENT_ROOT,
                SHARED_ROOT,
                'node_modules'
            ]
        },
        module: {
            rules: commonRules.concat([
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }
            ]),
            loaders: [
                {test: /\.hbs$/, loader: "handlebars"}
            ]
        },
        plugins: webPlugins.concat(process.env.NODE_ENV === 'development' ? webPluginsDev : webPluginsProd),
        devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
        devServer: {
            hot: true,
            inline: true,
            port: 9000,
            stats: 'minimal',
            contentBase: CLIENT_ROOT
        }
    },
    {
        name: "server",
        target: 'node',
        context: SERVER_ROOT,
        entry: {
            'main': './main.ts'
        },
        externals: nodeModules,
        output: {
            filename: 'server.js',
            path: SERVER_DESTINATION,
            libraryTarget: "commonjs2"
        },
        resolve: {
            extensions: commonExt,
            modules: [
                SERVER_ROOT,
                SHARED_ROOT,
                'node_modules'
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.CIRCLE_BUILD_NUM': JSON.stringify(process.env.CIRCLE_BUILD_NUM || '')
            })
        ],
        module: {
            rules: commonRules.concat([])
        },
        node: {
            __filename: false,
            __dirname: false
        },
        devtool: 'source-map'
    }
];
