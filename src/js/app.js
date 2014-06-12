// Main Marionette application module, exports application instance to the outside world
define(['jquery', 'underscore', 'backbone', 'marionette', 'moment', 'bootstrap', 'bootstrap/DummyDeferred', 'app/views/AppView'],
function($, _, Backbone, Marionette, Moment, Bootstrap, DummyDeferred, AppView) {

    // Create a new App object
    var App = function App(){}
    var Boot = [DummyDeferred];


    // EXtends the Marionette.Application.start method to
    // perform our bootstrapping from one centralised place
    App.prototype.start = function(){

        // Create the core application
        App.core = new Marionette.Application();


        // Set up some default on pre-initialize
        App.core.on("initialize:before", function (options) {
            App.core.vent.trigger('app:log', 'App: Initializing');

            App.views = {};
            App.services = {};
            App.data = {};

            var bootstrap = new Bootstrap({boot:Boot, failOnError: false});
            bootstrap.deferred.done(function() {
                App.core.vent.trigger('app:start');
            });

        });

        // Start-up the application on-start
        App.core.vent.bind('app:start', function(options){
            App.core.vent.trigger('app:log', 'App: Starting');
            if (Backbone.history) {
                App.core.vent.trigger('app:log', 'App: Backbone.history starting');
                Backbone.history.start();
                App.core.container.show(new AppView());
            }

            // Now up and views and render for base app here...
            App.core.vent.trigger('app:log', 'App: Done starting and running!');
        });

        // Set up some default on pre-initialize
        App.core.on("initialize:after", function (options) {
            App.core.vent.trigger('app:log', 'App: Initialized');
        });

        // Console shortcut
        App.core.vent.bind('app:log', function(msg) {
            console.log(msg);
        });

        // Set up the display region
        App.core.addRegions({
            container: '#container'
        })

        // Start app up
        App.core.start();
    }

   return App;

})