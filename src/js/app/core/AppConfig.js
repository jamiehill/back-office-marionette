define([
    'common/bootstrap/core/DeferredBase', 'ctx',

    'app/view/main/markets/MarketDetailsView',
    'app/view/header/HeaderView',
    'app/view/aside/simple/SimpleSearchView',
    'app/view/aside/advanced/AdvancedSearchView',

    'app/view/popups/login/LoginPopup',

    'app/model/EventDetailsModel',
    'app/model/EventCache',
    'app/model/SessionModel',
    'common/service/ApiService',
    'common/service/SocketService'
],
function (DeferredBase, ctx, HeaderView, MarketDetailsView, SimpleSearchView, AdvancedSearchView, LoginPopup, EventDetailsModel, EventCache, SessionModel, ApiService, SocketService) {
    return DeferredBase.extend({
        name: 'AppConfig',

        /**
         * Set up the IoC context
         */
        init: function() {
            this.app = this.options.app;
            this.ctx = ctx;
            this.manage();
        },

        /**
         * Then add our dependencies to be managed
         */
        manage: function(){

            // Arbitrary params
            this.ctx.register('appname', String, 'Ats Back Office');
            this.ctx.register('appid', String, 'web-sb-backoffice');
            this.ctx.register('endpoint', String, 'http://sportsbook-dev.amelco.co.uk/sb-backoffice/v1/api/');

            // Application
            this.ctx.register("vent").object(this.app.vent);
            this.ctx.register("reqres").object(this.app.reqres);
            this.ctx.register("commands").object(this.app.commands);

            // Views
            this.ctx.register('marketDetailsView', MarketDetailsView);
            this.ctx.register('simpleSearchView', SimpleSearchView);
            this.ctx.register('headerView', HeaderView);
            this.ctx.register('advancedSearchView', AdvancedSearchView);

            // Popups
            this.ctx.register('loginPopup', LoginPopup);

            // Models
            this.ctx.register('eventModel', EventDetailsModel, {vent: this.app.vent});
            this.ctx.register('eventCache', EventCache);
            this.ctx.register('sessionModel', SessionModel, {vent: this.app.vent});

            // Services
            this.ctx.register('apiService', ApiService, {url:this.app.endpoint});
            this.ctx.register('socketService', SocketService);

            this.construct();
        },


        /**
         * Finally constructs the container
         */
        construct: function(){
            var that = this;
            _.each(_.keys(this.ctx.map), function(key){
                console.log('Bootstrap: '+that.name+' - managed: '+key);
            });
            this.ctx.initialize();
            this.success(ctx);
        }
    });
});