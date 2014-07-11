// Karma configuration
// Generated on Fri Jul 11 2014 09:41:09 GMT+0100 (BST)

module.exports = function(config) {
    config.set({


        basePath: '',
        frameworks: ['jasmine', 'requirejs', 'chai-sinon'],

        // list files / patterns to load in browser
        files: [
            {pattern: 'src/js/vendor/**/*.js', included: false},    // include all vendor js
            {pattern: 'src/js/**/*.js', included: false},           // include application js
            {pattern: 'src/js/**/*.tpl.html', included: false},     // include application templates
            {pattern: 'test/**/*.spec.js', included: false},        // include all specs

            'test/test-config.js'                                   // include requirejs test config
        ],

        // exclude vendor specs and requirejs config
        exclude: [
            'src/js/vendor/**/*.spec.js',                           // exclude vendor specs
            'src/js/config.js'                                      // exclude requirejs main config
        ],


        reporters: ['spec'],
        plugins: [
            'karma-jasmine',
            'karma-chai-sinon',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-requirejs'
        ],


        browsers: ['PhantomJS_Custom'],
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
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        singleRun: false

    });
};
