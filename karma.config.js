module.exports = function (config) {
    config.set({
        singleRun: true,
        browsers: [
            'ChromeHeadless'
        ],
        frameworks: [
            'mocha'
        ],
        files: [
            'spec.bundle.js'
        ],
        reporters: ['progress'],
        preprocessors: {
            'spec.bundle.js': ['webpack']
        },
        webpack: require('./webpack-test.config'),
        webpackMiddleware: {
            stats: 'errors-only'
        },
        plugins: [
            require('karma-mocha'),
            require('karma-chrome-launcher'),
            require('karma-webpack')
        ]
    });
};
