define([
    'common/bootstrap/core/DeferredBase', 'ctx',

    'app/view/main/markets/MarketDetailsView',
    'app/view/nav/NavBarView',
    'app/view/search/simple/SimpleSearchView',
    'app/view/search/advanced/AdvancedSearchView',

    'app/view/popups/login/LoginPopup',

    'app/model/EventDetailsModel',
    'app/model/EventCache',
    'app/model/SessionModel',
    'common/service/ApiService',
    'common/service/SocketService'
],
function (DeferredBase, ctx, MarketDetailsView, NavBarView, SimpleSearchView, AdvancedSearchView, LoginPopup, EventDetailsModel, EventCache, SessionModel, ApiService, SocketService) {
    return DeferredBase.extend({
        name: 'AppConfig',

        /**
         * Set up the IoC context
         */
        init: function() {
            this.app = this.options.app;
            this.manage();
        },

        /**
         * Then add our dependencies to be managed
         */
        manage: function(){

            // Arbitrary params
            ctx.register('appname').object('Ats Back Office');
            ctx.register('appid').object('web-sb-backoffice');
            ctx.register('endpoint').object('http://sportsbook-dev.amelco.co.uk/sb-backoffice/v1/api/');

            // Application
            ctx.register("vent").object(this.app.vent);
            ctx.register("reqres").object(this.app.reqres);
            ctx.register("commands").object(this.app.commands);

            // Views
            ctx.register('marketDetailsView', MarketDetailsView);
            ctx.register('simpleSearchView', SimpleSearchView);
            ctx.register('navBarView', NavBarView);
            ctx.register('advancedSearchView', AdvancedSearchView);

            // Popups
            ctx.register("loginPopup", LoginPopup).strategy(di.strategy.proto); // new instance each time

            // Models
            ctx.register('eventModel', EventDetailsModel, {vent: this.app.vent});
            ctx.register('eventCache', EventCache);
            ctx.register('sessionModel', SessionModel, {vent: this.app.vent});

            // Services
            ctx.register('apiService', ApiService, {url:this.app.endpoint});
            ctx.register('socketService', SocketService);

            this.construct();
        },


        /**
         * Finally constructs the container
         */
        construct: function(){
            var that = this;
            _.each(_.keys(ctx.map), function(key){
                console.log('Bootstrap: '+that.name+' - managed: '+key);
            });
            ctx.initialize();
            this.success(ctx);
        }
    });
});