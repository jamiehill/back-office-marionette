define(['jquery', 'underscore', 'backbone', 'marionette', 'moment', 'w2ui', 'app/controller/Bootstrap', 'app/view/AppView', 'app/core/CommonModule'],
function($, _, Backbone, Marionette, moment, w2ui, Bootstrap, AppView, CommonModule) {

    // Main application
    var core = new Marionette.Application();

    /**
     * @type {string}
     */
    core.endpoint = 'http://sportsbook-dev.amelco.co.uk/sb-backoffice/v1/api/';


    // Core definitions


    // Set up some default on pre-initialize.
    // We'll use this pre-initialization hooks
    // to do any application bootstraping required.
    core.on("initialize:before", function (options) {
        core.vent.trigger('app:log', 'App: Initializing');
        core.bootStart = moment();

        // Perform app bootstrap sequence
        var bootstrap = new Bootstrap();
            bootstrap.deferred.done(function() {
            core.vent.trigger('app:start');
        });
    });


    // Set up some default on pre-initialize
    // Not entirely sure what should happen here
    core.on("initialize:after", function (options) {
        core.vent.trigger('app:log', 'App: Initialized');
    });


    // Once all pre-initialization and bootstrapping has been completed,
    // we need to start up the Backbone.History and add the main view
    // to the mainRegion.
    core.vent.bind('app:start', function(options){
        core.vent.trigger('app:log', 'App: Starting');
        core.container.show(new AppView());

        core.bootFinish = moment();
        core.bootDuration = core.bootFinish.diff(core.bootStart, 'seconds', true);

        // Now up and views and render for base app here...
        core.vent.trigger('app:log', 'App: StartUp completed in '+core.bootDuration+'s');
    });


    // Console shortcut
    core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });


    // Set up the display region
    core.addRegions({
        container: '#container'
    });


    // Module definitions


    /**
     * Common module houses all application files, such as services,
     * models and other pertinent data, that needs to be configured
     */
    core.module("Common", CommonModule);


    // Expose application core to the outside world
    App = {
        core: core,
        appName: 'Ats Back Office',
        start: function(options){
            core.start(options);
        }
    };

    return App;
});