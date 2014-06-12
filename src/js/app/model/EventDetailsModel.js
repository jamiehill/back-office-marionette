define(function (require) {

    var Marionette = require('marionette'),
        EventCache = require('app/model/EventCache'),
        Event = require('app/model/models/Event'),
        App = require('App');


    return Marionette.Controller.extend({
        cache: new EventCache(),

        /**
         * Initialises the model
         */
        initialize: function(){
            App.core.vent.bind('boEventSearch_eventSelected', this.onEventSelected);
            App.core.vent.bind('boEventSearch_eventUnselected', this.onEventUnselected);
            App.core.vent.bind('SubscribeResponse', this.onEventSubscription);
        },

        /**
         * Update subscriptions for curernt events
         */
        updateSubscriptions: function(){
            var events = this.getActiveEvents();
            App.services.socket.subscribeToEvents(events);
        },


        /**
         * Loads the specified event, only adding to the cache once the
         * response has been received and the event model updated
         * @param evt
         */
        loadEvent: function(evt){
            var that = this;
            that.evt = evt;
            App.services.api.getFullEventDetails(this, function(resp){
                var response = resp.attributes.Response;
                if (response.status === 'ERROR') return;

                that.evt.populate(response.body.Node);
                that.cache.addEvent(evt);

                that.updateSubscriptions();
            }, evt.id);
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
            var hasEvent = this.cache.hasEvent(e.data.id);

            // The event can exist on the cache, regardless of whether it exists in a 'sport'
            // collection.  Re-adding it, will ensure that it is housed in the correct
            // sport collection, and re-fire any collection events required to update the views
            if (hasEvent == false)
                this.loadEvent(Event.parse(e.data));
            else
            {
                this.cache.addEventToSport(e.data.id);
                this.updateSubscriptions();
            }
        },


        /**
         * An event has been unselected in the event tree
         * @param e
         */
        onEventUnselected: function(e) {
            var event = this.cache.get(e.data.id);
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
