'use strict';

module.exports = function(config) {
  config.set({
    basePath: '../../',

    files: [
      'test/conf/phantom-bind-polyfill.js',
      'frontend/components/jquery/dist/jquery.js',
      'frontend/components/angular/angular.js',
      'frontend/components/angular-animate/angular-animate.js',
      'frontend/components/angular-mocks/angular-mocks.js',
      'frontend/components/chai/chai.js',
      'frontend/components/chai-spies/chai-spies.js',
      'frontend/components/linagora.esn.yjs/frontend/js/angular-yjs.js',
      'frontend/components/Autolinker.js/dist/Autolinker.min.js',
      'frontend/components/dynamic-directive/dist/dynamic-directive.min.js',
      'test/module.js',
      'test/unit-frontend/**/*.js',
      'frontend/js/**/*.js',
      'frontend/views/*.pug'
    ],

    frameworks: ['mocha'],
    colors: true,
    singleRun: true,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox'],
    reporters: ['coverage', 'spec'],
    preprocessors: {
      'frontend/js/**/*.js': ['coverage'],
      'frontend/views/*.pug': ['ng-jade2module']

    },
    ngJade2ModulePreprocessor: {
      cacheIdFromPath: function(filepath) {
        var cacheId = '';

        if (filepath.match(/^frontend*/)) {
          cacheId = '/chat' + filepath.substr(8).replace('.pug', '.html');
        }

        return cacheId;
      },
      stripPrefix: 'frontend/',
      jadeRenderConfig: {
        __: function(str) { return str; }
      },

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('templates')
      moduleName: 'pugTemplates'
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-ng-jade2module-preprocessor'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit-frontend'
    },

    coverageReporter: {type: 'text', dir: '/tmp'}
  });
};
