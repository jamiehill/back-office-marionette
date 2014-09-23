/**
 * Created by Jamie on 22/09/2014.
 */
define([
    'marionette', 'backbone', 'ctx',
    'app/view/main/components/tabs/TabbedView',
    'app/view/main/agent/content/AccountBets',
    'app/view/main/agent/content/AccountCreation',
    'app/view/main/agent/content/AccountManagement',
    'app/view/main/agent/content/AccountOverview',
    'app/model/agent/Management',
    'text!app/view/main/components/tabs/TabbedView.tpl.html'
],

function (Marionette, Backbone, ctx, TabbedView, AccountBets, AccountCreation, AccountManagement, AccountOverview, Management, tpl) {
    var tabTemplate = "<li class='<%= selected %>'><a href='#' data-id='<%= id %>' class='tab'><%= tabName %></a></li>";

    return Marionette.CompositeView.extend({

        id: 'agent',
        template: _.template(tpl),
        tabViewContainer: '#tabs',
        itemViewContainer: '#tab-content',
        tabAttrib: 'name',
        selectedIndex: 2,
        events: {
            'click .tab': 'onTabClick'
        },


        /**
         * @param options
         */
        initialize: function(options){
            _.bindAll(this, 'addChild');
            this.collection = this.getSections();
        },


        /**
         * @param model
         * @param view
         * @param index
         */
        addChild: function(model, view, index){
            if (index == this.selectedIndex) {
                Marionette.CompositeView.prototype.addChild.apply(this, arguments);
            }
        },


        // Build an `itemView` for every model in the collection.
        buildItemView: function(item, ItemViewType, itemViewOptions){
            var options = _.extend({model: item}, itemViewOptions);
            return new ItemViewType(options);
        },



        /**
         *
         */
        onRender: function(){
            if (_.isUndefined(this.collection)) return;
            this.initTabs();
        },


        /**
         * @param e
         */
        onTabClick: function(e){
            e.preventDefault();
            this.selectedIndex = $(e.target).data('id');
            this.initTabs();
        },


        /**
         * @param options
         */
        initTabs: function(){
            var tabName, selected, tabsHtml = '';
            _.each(this.collection.models, function (m, index) {
                tabName     = m.get('title');
                selected    = this.selectedIndex == index ? 'selected' : '';
                tabsHtml   += _.template(tabTemplate, {tabName: tabName, id: index, selected: selected});
            }, this);

            this.tabs = $(this.el).find(this.tabViewContainer);
            $(this.tabs).html(tabsHtml);
        },


        /**
         * @param item
         * @returns {*}
         */
        getItemView: function(item) {
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
        },


        /**
         *
         */
        getSections: function() {
            var sections = [
                new Backbone.Model({name: 'OVERVIEW', title: 'Account Overview'}),
                new Backbone.Model({name: 'CREATION', title: 'Account Creation'}),
                new Management({name: 'MANAGEMENT', title: 'Account Management'}),
                new Backbone.Model({name: 'BETS', title: 'Account Bets'})
            ];
            return new Backbone.Collection(sections);
        }
    });
});