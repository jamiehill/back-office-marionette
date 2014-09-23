define([
    'common/bootstrap/core/DeferredBase', 'ctx',

    'app/view/main/agent/AgentView',
    'app/view/main/agent/AgentViewPM',
    'app/view/popups/login/LoginPopup',

    'app/model/EventDetailsModel',
    'app/model/AgentModel',
    'app/model/EventCache',
    'app/model/SessionModel',
    'common/service/ApiService',
    'common/service/SocketService',

    // agent
    'app/view/main/agent/content/AccountBets',
    'app/view/main/agent/content/AccountCreation',
    'app/view/main/agent/content/AccountManagement',
    'app/view/main/agent/content/AccountOverview'
],
function (DeferredBase, ctx, AgentView, AgentViewPM, LoginPopup, EventDetailsModel, AgentModel, EventCache, SessionModel, ApiService, SocketService, AccountBets, AccountCreation, AccountManagement, AccountOverview) {
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

            // Models
            ctx.register('eventModel', EventDetailsModel, {vent: this.app.vent});
            ctx.register('agentModel', AgentModel, {vent: this.app.vent});
            ctx.register('eventCache', EventCache);
            ctx.register('sessionModel', SessionModel, {vent: this.app.vent});

            // Services
            ctx.register('apiService', ApiService);
            ctx.register('socketService', SocketService);

            // Application
            ctx.register("vent").object(this.app.vent);
            ctx.register("reqres").object(this.app.reqres);
            ctx.register("commands").object(this.app.commands);

            // Views
            ctx.register('agentView', AgentView);
            ctx.register('agentViewPM', AgentViewPM);

            // Agent
//            ctx.register('accountBets', AccountBets).strategy(di.strategy.proto);;
//            ctx.register('accountCreation', AccountCreation).strategy(di.strategy.proto);;
//            ctx.register('accountManagement', AccountManagement).strategy(di.strategy.proto);;
//            ctx.register('accountOverview', AccountOverview).strategy(di.strategy.proto);;

            var model = ctx.get('agentModel');

            ctx.register('accountBets', AccountBets, {model: model.bets}).strategy(di.strategy.proto);;
            ctx.register('accountCreation', AccountCreation, {model: model.creation}).strategy(di.strategy.proto);;
            ctx.register('accountManagement', AccountManagement, {model: model.management}).strategy(di.strategy.proto);;
            ctx.register('accountOverview', AccountOverview, {model: model.overview}).strategy(di.strategy.proto);;

            // Popups
            ctx.register("loginPopup", LoginPopup).strategy(di.strategy.proto); // new instance each time

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
            this.success(ctx);
        }
    });
});