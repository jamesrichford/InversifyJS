var plugins = [
  'karma-coverage',
  'karma-mocha',
  'karma-chai',
  'karma-sinon',
  'karma-chrome-launcher',
  'karma-firefox-launcher',
  'karma-safari-launcher',
  'karma-ie-launcher',
  'karma-phantomjs-launcher'
];

/*
var browsers = [
  'Chrome',
  'Firefox',
  'Safari',
  'IE',
  'PhantomJS'
];
*/

var browsers = [
  'PhantomJS'
];

module.exports = function (config) {
  'use strict';

  config.set({
    singleRun: true, // Set to false to DEBUG unit tests
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    browsers: browsers,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },
    plugins : plugins,
    preprocessors: {
      '**/bundled/test/**/all.test.js' : 'coverage'
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
