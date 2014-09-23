define([
    'backbone',
    'app/model/agent/Overview',
    'app/model/agent/Creation',
    'app/model/agent/Management',
    'app/model/agent/Bets'
],
function (Backbone, Overview, Creation, Management, Bets) {
    return Backbone.Model.extend({
        dependencies: 'vent, commands',


        overview: new Overview(),
        creation: new Creation(),
        management: new Management(),
        bets: new Bets(),

        /**
         * @param evts
         */
        ready: function(){
            _.bindAll(this, 'onSessionStarted');
            this.vent.on('session:loggedin', this.onSessionStarted);
        },


        /**
         *
         */
        onSessionStarted: function() {
            this.commands.execute('command:getChildAccounts');
        },


        /**
         * Adds an event instance to the cache
         * @param event
         */
        addChildAccounts: function(accounts) {
            if (_.size(accounts) == 0) return;
            this.management.set({accounts: accounts});
        },


        /**
         *
         */
        getSections: function() {
            return new Backbone.Collection([
                this.overview,
                this.creation,
                this.management,
                this.bets
            ]);
        }
    });
});