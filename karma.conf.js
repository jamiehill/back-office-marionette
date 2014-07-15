// Karma configuration
// Generated on Fri Jul 11 2014 09:41:09 GMT+0100 (BST)

module.exports = function(config) {
    config.set({


        basePath: '',

        // available chai, chai-as-promised, chai-jquery, sinon-chai, chai-things
        frameworks: ['requirejs', 'jasmine', 'chai', 'sinon-chai'],

        // list files / patterns to load in browser
        files: [
            'test/test-config.js',                                  // include requirejs test config

            {pattern: 'src/js/vendor/**/*.js', included: false},    // include all vendor js
            {pattern: 'src/js/**/*.js', included: false},           // include application js
            {pattern: 'src/js/**/*.tpl.html', included: false},     // include application templates
            {pattern: 'test/**/*.spec.js', included: false}         // include all specs
        ],

        // exclude vendor specs and requirejs config
        exclude: [
            'src/js/vendor/**/*.spec.js',                           // exclude vendor specs
            'src/js/config.js'                                      // exclude requirejs main config
        ],


        reporters: ['spec'],
        plugins: [
            'karma-jasmine',
//            'karma-chai',
            'karma-phantomjs-launcher',
            'karma-chai-plugins',
//            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-requirejs'
        ],


        browsers: ['PhantomJS'],
        customLaunchers: {
            PhantomJS_Custom: {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                }
            }
        },


        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false

    });
};
