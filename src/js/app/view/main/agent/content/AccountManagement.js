define([
    'marionette',
    'text!app/view/main/agent/content/management/AccountManagement.tpl.html'
],
function (Marionette, tpl) {
    return Marionette.ItemView.extend({

        dependencies: 'pm=accountManagementPM',
        template: _.template(tpl),
        tagName: "li",
        selectedIndex: 0,
        events: {

        },


        /**
         *
         */
        ready: function() {
            _.extend(this.pm.options, this.options);
        }
    });
});