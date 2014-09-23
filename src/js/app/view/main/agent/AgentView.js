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
        dependencies: 'pm=agentViewPM, model=agentModel',


        id: 'agent',
        template: _.template(tpl),
        tabViewContainer: '#tabs',
        childViewContainer: '#tab-content',
        tabAttrib: 'name',
        selectedIndex: 0,
        selections: null,
        events: {
            'click .tab': 'onTabClick'
        },


        /**
         * @param options
         */
        ready: function(options){
            _.bindAll(this, 'addChild');
            this.collection = this.model.getSections();
            this.render();
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


        /**
         * @param child
         * @param ChildViewClass
         * @param childViewOptions
         * @returns {ChildViewClass}
         */
        buildChildView: function(child, ChildViewClass, childViewOptions) {
            var options = _.extend({model: child}, childViewOptions),
                clazz   = child.get('clazz');
            return ctx.get(clazz);
        }


        /**
         *
         */
//        onRender: function(){
//            if (_.isUndefined(this.collection)) return;
//            this.initTabs();
//        },


        /**
         * @param e
         */
//        onTabClick: function(e){
//            e.preventDefault();
//            this.selectedIndex = $(e.target).data('id');
//            this.render();
//        },


//        /**
//         * @param options
//         */
//        initTabs: function(){
//            var tabName, selected, tabsHtml = '';
//            _.each(this.collection.models, function (m, index) {
//                tabName     = m.get('title');
//                selected    = this.selectedIndex == index ? 'selected' : '';
//                tabsHtml   += _.template(tabTemplate, {tabName: tabName, id: index, selected: selected});
//            }, this);
//
//            this.tabs = $(this.el).find(this.tabViewContainer);
//            $(this.tabs).html(tabsHtml);
//        }
    });
});