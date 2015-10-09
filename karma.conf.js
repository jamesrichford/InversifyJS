var plugins = [
  'karma-coverage',
  'karma-mocha',
  'karma-chai',
  'karma-sinon',
  //'karma-chrome-launcher', // TODO: DEV only
  'karma-phantomjs-launcher'
];

var browsers = [
  //'Chrome', // TODO: DEV only
  'PhantomJS'
];

module.exports = function (config) {
  'use strict';

  config.set({
      basePath: '',
      singleRun: false,
      frameworks: ['mocha', 'chai', 'sinon'],
      browsers: browsers,
      reporters: ['progress', 'coverage'],
      coverageReporter: {
        type : 'lcov',
        dir : 'coverage/'
      },
      plugins : plugins,
      preprocessors: {
        '**/bundled/test/**/*.test.js' : 'coverage'
      },
      files : [
        { pattern: "node_modules/bluebird/js/browser/bluebird.min.js", included: true },
        { pattern: "node_modules/reflect-metadata/Reflect.js", included: true },
        { pattern: "bundled/test/**/*.test.js", included: true }
      ],
      port: 9876,
      colors: true,
      autoWatch: false,
      logLevel: config.LOG_INFO
  });
};
