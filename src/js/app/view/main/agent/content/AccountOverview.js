/**
 * Created by Jamie on 23/09/2014.
 */
define([
    'marionette',
    'text!app/view/main/agent/content/overview/AccountOverview.tpl.html'
],
function (Marionette, tpl) {
    return Marionette.ItemView.extend({
        dependencies: 'agentModel',


        id: 'tab1',
        className: 'form-body ui-tabs-panel ui-widget-content ui-corner-bottom',
        template: _.template(tpl),
        tagName: "li",


        events: {
            'click a[id=submit]' : 'onFormSubmit',
            'click a[id=reset]' : 'onFormClear'
        },


        /**
         *
         */
        ready: function() {
            _.bindAll(this, 'onFormSubmit');
        },


        /**
         *
         */
        onRender: function() {
            this.currentPass = $('input[name=currentPass]');
            this.newPass = $('input[name=newPass]');
            this.confirmPass = $('input[name=confirmPass]');
        },


        /**
         * @param options
         */
        onFormSubmit: function(e) {
            var current = e;
        },


        /**
         * @param options
         */
        onFormClear: function(e) {
            $(this.currentPass).value('');
            $(this.newPass).value('');
            $(this.confirmPass).value('');
        }
    });
});