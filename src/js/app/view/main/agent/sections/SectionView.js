/**
 * Created by Jamie on 22/09/2014.
 */
define([
    'marionette'
],

function (Marionette) {
    return Marionette.ItemView.extend({

        tagName: 'li',


        /**
         *
         */
        initialize: function() {
            this.id = this.model.name;
        }


    });
});