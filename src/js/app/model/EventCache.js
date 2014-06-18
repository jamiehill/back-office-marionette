define(['backbone', 'app/model/models/Event'],
function (Backbone, Event) {
    return Backbone.Collection.extend({

        model: Event,
        sports: {},

        /**
         * On initialization, we want to listen to the event tree for event
         * selection/unselections, and also parse any initially provided events
         * @param events
         */
        initialize: function(evts){
            this.addAll(evts);
        },


        /**
         * Adds an event instance to the cache
         * @param event
         */
        addEvent: function(evt) {
            if (_.isUndefined(evt)) return;
            this.getSport(evt.get('sport')).add(evt);
            this.add(evt);
            this.trigger("addEvent", {event:evt});
        },


        /**
         * Adds an array of events
         * @param evts
         */
        addAll: function(evts) {
            if (_.isUndefined(evts)) return;
            _.each(evts, this.addEvent, this);
        },


        /**
         * Adds an existing (cached) Event, into it's appropriate Sport collection
         * @param id
         */
        addEventToSport: function(id){
            var event = this.getEvent(id),
                sport = this.getSport(event.get('sport'));
            if (sport.get(event.id) === undefined){
                sport.add(event);
                this.trigger("addEvent", {event:event});
            }
        },


        /**
         * Retrieve an Event from teh collection
         * @param id
         */
        getEvent: function(id){
            return this.get(id);
        },


        /**
         * Retrieve an Event from teh collection
         * @param id
         */
        hasEvent: function(id){
            var event = this.getEvent(id);
            return event !== undefined;
        },


        /**
         * Removes an event instance from it's appropriate 'sport' collection, but not from this cache.
         * @param event
         */
        removeEvent: function(evt) {
            var sport = evt.get('sport'),
                coll  = this.getSport(sport);
            coll.remove(evt, {});
            this.trigger("removeEvent", {event:evt});
        },


        /**
         * Adds an array of events
         * @param evts
         */
        removeAll: function(evts) {
            _.each(evts, this.removeEvent, this);
            this.sports = {};
        },


        /**
         * Returns a stack Collection' or creates a new one if not already present
         * @param evt
         * @returns {*}
         */
        getSport: function(sport) {
            if (_.isUndefined(this.sports[sport]))
                this.sports[sport] = this.factory(sport);
            return this.sports[sport];
        },


        /**
         * Update multiple Event instances with received SubscribeResponse data
         * @param evts
         */
        updateEvents: function(evts){
            var that = this;
            _.each(evts, function(evt){
                var id = evt.matchDetails.matchId,
                    event = that.get(id);
                if (event !== undefined)
                    event.update(evt);
            })
        },


        /**
         * Factory method for producing collections
         * @returns {*|void}
         */
        factory: function(sport) {
            return new (Backbone.Collection.extend({
                model: Event,
                sport: sport,
                sortField: 'eventTime',
                comparator: function(a, b) {
                    return App.util.sort.sortOn(a, b, this.sortField);
                }
            }))();
        }

    });
});