define(function (require) {

    var Marionette = require('marionette'),
        EventCache = require('app/model/EventCache'),
        Event = require('app/model/models/Event');

    return Marionette.Controller.extend({
        dependencies: 'vent, cache=eventCache, api=apiService, socket=socketService',


        /**
         * Initialises the model
         */
        ready: function(options){
            _.bindAll(this, 'onEventSelected', 'onEventUnselected', 'onEventSubscription', 'loadEvent', 'getActiveEvents');
            this.vent.bind('search:eventselected', this.onEventSelected);
            this.vent.bind('search:eventunselected', this.onEventUnselected);
            this.vent.bind('SubscribeResponse', this.onEventSubscription);
        },

        /**
         * Update subscriptions for curernt events
         */
        updateSubscriptions: function(){
            var events = this.getActiveEvents();
            this.socket.subscribeToEvents(events);
        },


        /**
         * Loads the specified event, only adding to the cache once the
         * response has been received and the event model updated
         * @param evt
         */
        loadEvent: function(evt){
            var that = this;
            that.evt = evt;
            this.api.getFullEventDetails(evt.id).done(function(resp){
                var response = resp.Response;
                if (response.status === 'ERROR') return;

                that.evt.populate(response.body.Node);
                that.cache.addEvent(evt);

                that.updateSubscriptions();
            });
        },


        /**
         * Returns an Array of event ids, for all active (in view) events
         * @returns {*}
         */
        getActiveEvents: function(){
            var events = [];
            _.each(this.cache.sports, function(val, key){
                events = events.concat(val.models);
            });
            return _.pluck(events, 'id');
        },


        // Handlers


        /**
         * An event has been selected in the event tree
         * @param e
         */
        onEventSelected: function(e) {
            var hasEvent = this.cache.hasEvent(e.id);

            // The event can exist on the cache, regardless of whether it exists in a 'sport'
            // collection.  Re-adding it, will ensure that it is housed in the correct
            // sport collection, and re-fire any collection events required to update the views
            if (hasEvent == false)
                this.loadEvent(new Event(e));
            else
            {
                this.cache.addEventToSport(e.id);
                this.updateSubscriptions();
            }
        },


        /**
         * An event has been unselected in the event tree
         * @param e
         */
        onEventUnselected: function(e) {
            var event = this.cache.get(e.id);
            if (event === undefined) return;
            this.cache.removeEvent(event);
        },


        /**
         *  $.trigger(this, 'SubscriptionResponse', data.SubscriptionResponse.match);
         * @param data
         */
        onEventSubscription: function(events){
            this.cache.updateEvents(events.data);
        }
    });
});
