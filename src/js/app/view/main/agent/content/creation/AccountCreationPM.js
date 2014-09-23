/**
 * Created by Jamie on 23/09/2014.
 */
define([
    'marionette',
    'text!app/view/main/agent/content/creation/AccountCreation.tpl.html'
],
function (Marionette, tpl) {
    return Marionette.ItemView.extend({

        template: _.template(tpl),
        tagName: "li",


        /**
         *
         */
        ready: function() {

        }
    });
});