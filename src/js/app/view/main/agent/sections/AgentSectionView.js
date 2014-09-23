/**
 * Created by Jamie on 22/09/2014.
 */
define([
    'marionette',
    'app/view/main/components/tabs/TabbedView',
    'app/view/main/agent/content/AccountBets',
    'app/view/main/agent/content/AccountCreation',
    'app/view/main/agent/content/AccountManagement',
    'app/view/main/agent/content/AccountOverview',
    'common/util/CollectionUtil'
],

function (Marionette, TabbedView, AccountBets, AccountCreation, AccountManagement, AccountOverview) {
    return TabbedView.extend({

        id: 'section',
        tabAttrib: 'name',
        selectedIndex: 0,

        /**
         * @param item
         * @returns {*}
         */
        getChildView: function(item) {
            var clazz = AccountOverview;
            switch(item.get('name')) {
                case 'BETS' :
                    clazz = AccountBets;
                    break
                case 'CREATION' :
                    clazz = AccountCreation;
                    break;
                case 'MANAGEMENT' :
                    clazz = AccountManagement;
                    break;
            }
            return clazz;
        }


//        initialize: function(){
//            var sections = [
////                new Backbone.Model({name: 'Account Overview'}),
////                new Backbone.Model({name: 'Account Creation'}),
//                new Backbone.Model({name: 'Account Management'}),
//                new Backbone.Model({name: 'Account Bets'})
//            ];
//            var collection = new Backbone.Collection(sections);
//            TabbedView.prototype.initialize.call(this, {collection:collection});
//        }

    });
});