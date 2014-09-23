// Require.js configuration for the application:
require.config({
    baseUrl:"./js",


    // Configuring libraries aliases (shortcuts)
    paths: {
        'jquery'                : 'vendor/jquery/dist/jquery',
        'underscore'            : 'vendor/underscore/underscore',
        'backbone'              : 'vendor/backbone/backbone',
        'marionette'            : 'vendor/marionette/lib/backbone.marionette',
        'backbone.babysitter'   : 'vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr'        : 'vendor/backbone.wreqr/lib/backbone.wreqr',
        'jqueryui'             : 'vendor/jquery-ui.min',
        'backbone.command'      : 'common/framework/command/Backbone.Command',
        'modal'                 : 'vendor/backbone.modal',
        'w2ui'                  : 'vendor/w2ui/w2ui-1.4.1',
        'text'                  : 'vendor/requirejs-text/text',
        'moment'                : 'vendor/moment/moment',
        'di'                    : 'vendor/di-lite/di-lite',
        'ctx'                   : 'app/core/ctx',
        'app'                   : 'app',
        'underscore.string'     : 'vendor/underscore.string/lib/underscore.string'
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
        'jqueryui'              : { deps: ['jquery'] },
        'moment'                : { exports : 'moment' }
    }
});

// Kick off the main application
require(['app'], function(app){
    App.start();
})