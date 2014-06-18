define([
    'marionette',
    'app/view/main/markets/stack/SportsView'
],

function (Marionette, SportsView) {
    return Marionette.View.extend({
        dependencies: 'cache=eventCache',


        id: 'sportstack',
        className: 'sportstack',
        tagName: 'ul',
        views: {},


        /**
         * DI injection complete
         */
        ready: function(){
            this.listenTo(this.cache, "addEvent", this.addEvent);
            this.listenTo(this.cache, "removeEvent", this.removeEvent);
        },


        /**
         * @param e
         */
        addEvent: function(e) {
            var sport = e.event.get('sport'),
                view  = this.getView(sport);
            $(this.el).append(view.render().el);
        },


        /**
         * @param e
         */
        removeEvent: function(e) {
            var sport = e.event.get('sport'),
                col = this.cache.getSport(sport);
            if (col.length > 0) return;

            this.getView(sport).remove();
            delete this.views[sport];
        },


        /**
         * Returns - or creates if non-existent - the view for the specified sport
         * @param sport
         * @returns {*}
         */
        getView: function (sport) {
            var col = this.cache.getSport(sport);
            if (_.isUndefined(this.views[sport]))
                this.views[sport] = new SportsView({collection:col, name:sport});
            return this.views[sport];
        }


    });
});