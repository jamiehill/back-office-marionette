define([
    'marionette'
],

function (Marionette) {
    return Marionette.View.extend({
        dependencies: 'vent',


        tagName: 'ul',
        className: 'alerts',
        events: {
            'click close' : 'onCloseClick'
        },


        /**
         *
         */
        ready: function(){
            _.bindAll(this, 'onAppAlert', 'onCloseClick');
            this.vent.on('app:alert', this.onAppAlert);
        },


        onShow: function() {

        },


        /**
         *
         */
        onAppAlert: function() {
            var args = Array.prototype.slice.call(arguments);
            this.$el.empty();

            _.each(args[0], function(alert){
                this.$el.append('<li>'+alert+'</li>');
            }, this);
        },


        /**
         *
         */
        onCloseClick: function() {

        }
    });
});