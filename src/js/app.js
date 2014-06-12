define(['jquery', 'underscore', 'backbone', 'marionette', 'moment', 'bootstrap', 'bootstrap/UrlResolver', 'app/views/AppView'],
function($, _, Backbone, Marionette, Moment, Bootstrap, UrlResolver, AppView) {

    // Main application
    var core = new Marionette.Application();


    // Set up some default on pre-initialize
    core.on("initialize:before", function (options) {
        core.vent.trigger('app:log', 'App: Initializing');

        var sequence = [UrlResolver],
            bootstrap = new Bootstrap({boot:sequence, failOnError: false});
        bootstrap.deferred.done(function() {
            core.vent.trigger('app:start');
        });

    });


    // Set up some default on pre-initialize
    core.on("initialize:after", function (options) {
        core.vent.trigger('app:log', 'App: Initialized');
    });


    // Start-up the application on app:start
    core.vent.bind('app:start', function(options){
        core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();
            core.container.show(new AppView());
        }

        // Now up and views and render for base app here...
        core.vent.trigger('app:log', 'App: Done starting and running!');
    });


    // Console shortcut
    core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });


    // Set up the display region
    core.addRegions({
        container: '#container'
    });

    // Expose application core to the outside world
    App = {
        core: core,
        appName: 'Ats Back Office',
        views: {},
        services: {},
        data: {},
        start: function(options){
            core.start(options);
        }
    }

    return App;
});