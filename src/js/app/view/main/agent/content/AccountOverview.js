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
            _.bindAll(this, 'onFormSubmit', 'onFormClear');
        },


        /**
         *
         */
        onRender: function() {
            this.$currentPass = this.$el.find('input[name=currentPass]');
            this.$newPass     = this.$el.find('input[name=newPass]');
            this.$confirmPass = this.$el.find('input[name=confirmPass]');
        },


        /**
         * @param options
         */
        onFormSubmit: function(e) {
            var currentPass = this.$currentPass.val(),
                newPass = this.$newPass.val(),
                confirmPass =this.$confirmPass.val();

            var
        },


        /**
         * @param options
         */
        onFormClear: function(e) {
            $('input[name=currentPass]').val('');
            $('input[name=newPass]').val('');
            $('input[name=confirmPass]').val('');
            setTimeout(function(){
                $('input[name=currentPass]').focus();
            }, 50);
        }
    });
});