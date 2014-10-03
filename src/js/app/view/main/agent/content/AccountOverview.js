/**
 * Created by Jamie on 23/09/2014.
 */
define([
    'marionette',
    'text!app/view/main/agent/content/overview/AccountOverview.tpl.html'
],
function (Marionette, tpl) {
    return Marionette.ItemView.extend({
        dependencies: 'agentModel, vent',


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
            // get the results of the validated form
            var results = this.validate();
            if (results.length > 0) {
                this.vent.trigger('app:alert', results);
                return;
            }

            // if validated hit the change password api
            this.commands.execute('command:changePassword',
                this.$currentPass.val(),
                this.$newPass.val(),
                this.$confirmPass.val());
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
        },


        /**
         * @returns {*}
         */
        validate: function(){
            var currentPass = this.$currentPass.val(),
                newPass     = this.$newPass.val(),
                confirmPass = this.$confirmPass.val();

            var results = [];
            if (_.isEmpty(currentPass)) results.push('You must provide your old password');
            if (_.isEmpty(newPass))     results.push('You must provide a new password');
            if (_.isEmpty(confirmPass)) results.push('You must confirm your new password');

            // if somethings not been filled in, tell them so
            if (_.size(results) > 0)
                return results;

            // If the new password doesn't match the confirmed password tell them so
            if (newPass !== confirmPass)
                return ["The new password doesn't match the confirmation password"];

            return results;
        },
    });
});