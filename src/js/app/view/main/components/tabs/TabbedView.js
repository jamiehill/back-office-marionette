define(['marionette', 'app/view/main/components/tabs/TabContentView', 'text!app/view/main/components/tabs/TabbedView.tpl.html'],
function (Marionette, TabContentView, tpl) {

    var tabTemplate = "<li class='<%= selected %>'><a href='#' data-id='<%= id %>' class='tab'><%= tabName %></a></li>";

    return Marionette.CompositeView.extend({


        template: _.template(tpl),
        tabViewContainer: '#tabs',
        childViewContainer: '#tab-content',
        childView: TabContentView,
        tabAttrib: 'name',
        selectedIndex: 0,
        events: {
            'click .tab': 'onTabClick'
        },


        initialize: function(options){
            _.bindAll(this, 'addChild');
            this.collection = options.collection;
        },


        /**
         *
         */
        onRender: function(){
            if (_.isUndefined(this.collection)) return;
            this.initTabs();
        },


        /**
         * @param model
         * @param view
         * @param index
         */
        addChild: function(model, view, index){
            if (index == this.selectedIndex) {
                Marionette.CollectionView.prototype.addChild.apply(this, arguments);
            }
        },


        /**
         * @param e
         */
        onTabClick: function(e){
            e.preventDefault();
            this.selectedIndex = $(e.target).data('id');
            this.render();
        },


        /**
         * @param options
         */
        initTabs: function(){
            var tabName, selected, tabsHtml = '';
            _.each(this.collection.models, function (m, index) {
                tabName     = m.get(this.tabAttrib);
                selected    = this.selectedIndex == index ? 'selected' : '';
                tabsHtml   += _.template(tabTemplate, {tabName: tabName, id: index, selected: selected});
            }, this);

            this.tabs = $(this.el).find(this.tabViewContainer);
            $(this.tabs).html(tabsHtml);
        }
    });
});