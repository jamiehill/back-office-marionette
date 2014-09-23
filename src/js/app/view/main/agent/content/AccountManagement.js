define([
    'marionette',
    'text!app/view/main/agent/content/management/AccountManagement.tpl.html'
],
function (Marionette, tpl) {
    return Marionette.ItemView.extend({
        dependencies: 'agentModel, apiService, commands',


        id: 'tab3',
        className: 'form-body ui-tabs-panel ui-widget-content ui-corner-bottom',
        template: _.template(tpl),
        tagName: "li",


        /**
         *
         */
        initialize: function() {
            this.listenTo(this.model, 'change:accounts', this.onModelChange);
        },


        /**
         *
         */
        onModelChange: function(){
            this.render();
        }
    });
});