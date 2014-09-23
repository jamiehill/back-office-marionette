var tests = [];
var TEST_REGEXP = /\.spec\.js$/i;
for (var file in window.__karma__.files) {
    if (TEST_REGEXP.test(file)) {
        tests.push(file);
    }
}

require.config({
    // Karma serves files from '/base'
    baseUrl: 'base/src/js',

    // Configuring libraries aliases (shortcuts)
    paths: {
        'jquery'                : 'vendor/jquery/dist/jquery',
        'jqueryPubsub'          : 'vendor/jquery-pubsub/jquery.pubsub',
        'underscore'            : 'vendor/underscore/underscore',
        'backbone'              : 'vendor/backbone/backbone',
        'marionette'            : 'vendor/marionette/lib/backbone.marionette',
        'backbone.babysitter'   : 'vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr'        : 'vendor/backbone.wreqr/lib/backbone.wreqr',
        'backbone.command'      : 'common/framework/command/Backbone.Command',
        'modal'                 : 'vendor/backbone.modal',
        'w2ui'                  : 'vendor/w2ui/w2ui-1.4.1',
        'text'                  : 'vendor/requirejs-text/text',
        'moment'                : 'vendor/moment/moment',
        'di'                    : 'vendor/di',
        'ctx'                   : 'app/core/ctx',
        'app'                   : 'app',
        'underscore.string'     : 'vendor/underscore.string'
    },


    shim : {
        'di'                    : { exports: 'di' },
        'ctx'                   : { exports: 'ctx' },
        'backbone'              : { exports: 'Backbone', deps: ['underscore', 'jquery'] },
        'marionette'            : { exports: 'Marionette', deps: ['underscore', 'backbone', 'jquery'] },
        'backbone.wreqr'        : { exports: 'Wreqr', deps: ['marionette'] },
        'backbone.command'      : { exports: 'Command', deps: ['marionette'] },
        'modal'                 : { exports: 'Modal', deps: ['underscore', 'backbone', 'jquery'] },
        'jasmine'               : { exports: 'jasmine' },
        'underscore'            : { exports: '_' },
        'underscore.string'     : { deps: ['underscore'] },
        'w2ui'                  : { deps: ['jquery'] },
        'jqueryPubsub'          : { deps: ['jquery'] },
        'moment'                : { exports : 'moment' }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start

});

// Kick off the main application
//require(['app'], function(app){
//    App.start();
//})