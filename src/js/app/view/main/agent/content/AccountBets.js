/**
 * Created by Jamie on 23/09/2014.
 */
define([
        'marionette',
        'text!app/view/main/agent/content/bets/AccountBets.tpl.html'
    ],
    function (Marionette, tpl) {
        return Marionette.ItemView.extend({
            dependencies: 'agentModel',


            id: 'tab4',
            className: 'form-body ui-tabs-panel ui-widget-content ui-corner-bottom',
            template: _.template(tpl),
            tagName: "li",


            /**
             * @param options
             */
//        ready: function(options) {
//            this.model = this.agentModel.overview;
//        }
        });
    });