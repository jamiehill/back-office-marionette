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


        // section models
        overview: new Overview(),
        creation: new Creation(),
        management: new Management(),
        bets: new Bets(),

        accounts: null,

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
            this.set({accounts: accounts});
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
        },


        /**
         * Compares the accountIds specified to calculate the
         * differential between them both, in terms of clearance
         *
         * A positive return value, indicates that the second is a
         * descendant of first.  A negative value indicates that
         * the first is actually a descendant of second
         */
        getChildDepth: function(first, second) {
            // K8-3-02-034-94
            // split each user accountId into the hierarchy segments
            var tiers1 = first.split('-'),
                tiers2 = second.split('-');

            // if first has more segments than second,
            // first must be a lower order user.  As such, the
            // differential should reflect a negative value,
            // being the tier difference between the two
            if (_.size(tiers1) > _.size(tiers2))
                return tiers2.length - tiers1.length;

            // if the first has less segments, he's a more senior member,
            // so we just need to calculate the differtential
            if (_.size(tiers1) < _.size(tiers2))
                return tiers2.length - tiers1.length;


            // if both have the same number of segments, they're
            // affectively at the same level.  This will never
            // really happen as a user can only see his/her
            // child users not siblings
            return 0;
        },


        /**
         * Determines if the second user is a child of the first user.
         * @param first
         * @param second
         * @returns {boolean}
         */
        isChildUser: function(first, second) {
            return this.getChildDepth(first, second) == 1;
        }
    });
});