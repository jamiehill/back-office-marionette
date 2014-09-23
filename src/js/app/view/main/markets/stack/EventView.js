define([
    'backbone', 'marionette',
    'text!app/view/main/markets/stack/EventView.tpl.html',
    'app/view/main/markets/sports/BaseView',
    'app/view/main/markets/sports/football/FootballView',
    'app/view/main/markets/sports/horses/HorsesView',
    'app/view/main/markets/sports/BaseEventToolbar',
    'app/view/main/markets/sports/horses/toolbar/HorsesToolbar',
    'app/view/main/markets/sports/horses/controls/HorsesControls'
],

function (Backbone, Marionette, tpl,
          BaseView, FootballView, HorsesView, BaseEventToolbar, HorsesToolbar, HorsesControls) {
    'use strict';

    /**
     * Base view class for all sports
     */
    var EventView = Marionette.LayoutView.extend({

        tagName: 'li',
        id: function(){ return this.model.id; },
        events: {
            'dblclick .item-header2' : 'toggle'
        },


        /**
         * Renders the top level accordion container
         * @returns {MarketDetailsView}
         */
        render: function(){
            $(this.el).append(
                _.template(tpl, {event:this.model}));

            this.initToolbar();
            this.initControls();
            this.initGrid();
            return this;
        },


        /**
         * @returns {*|el|w.el}
         */
        initToolbar: function(){
            var view = this.getToolbar(),
                element = $(this.el).find('.item-header2');

            this.$toolbar = new view({el: element, model:this.model});
            this.showRegion('header', '.item-header2', this.$toolbar);

            this.listenTo(this.$toolbar, 'toggleButtonClick', this.toggle);
            this.listenTo(this.$toolbar, 'filter', this.filter);
        },


        /**
         * @returns {*|el|w.el}
         */
        initControls: function(){
            var view = this.getControls(),
                element = $(this.el).find('#controls'),
                display = (view == undefined) ? 'none' : 'block';

            // not all sports will have a controls panel
            // so just return out if a view isn't returned
            $(element).css({'display':display});
            if (view === undefined) return;

            this.$controls = new view({el:element, model:this.model});
            this.showRegion('controls', '.item-content#controls', this.$controls);
        },


        /**
         * @returns {*|el|w.el}
         */
        initGrid: function(){
            var view = this.getView(),
                element = $(this.el).find('#content');

            this.$datagrid = new view({el:element, model:this.model});
            this.showRegion('content', '.item-content#content', this.$datagrid);
        },


        /**
         * Returns the view associated with the specified sport.
         * @param sport
         * @returns {*}
         */
        getToolbar: function () {
            var sport = this.model.get('sport').toLowerCase(),
                ToolbarClass;

            switch(sport) {
                case 'horse_racing':
                    ToolbarClass = HorsesToolbar;
                    break;
                default:
                    ToolbarClass = BaseEventToolbar;
                    break;
            }
            return ToolbarClass;
        },


        /**
         * Returns the view associated with the specified sport.
         * @param sport
         * @returns {*}
         */
        getControls: function () {
            var sport = this.model.get('sport').toLowerCase(),
                ViewClass;

            switch(sport) {
                case 'horse_racing':
                    ViewClass = HorsesControls;
                    break;
            }

            return ViewClass;
        },


        /**
         * Returns the view associated with the specified sport.
         * @param sport
         * @returns {*}
         */
        getView: function () {
            var sport = this.model.get('sport').toLowerCase(),
                ViewClass;

            switch(sport) {
                case 'horse_racing':
                    ViewClass = HorsesView;
                    break;
                default:
                    ViewClass = FootballView;
                    break;
            }

            return ViewClass;
        },


        /**
         * @param name
         * @param tag
         * @param element
         */
        showRegion: function(name, tag, element){
            var region = this.addRegion(name, tag);
            region.show(element);
        },


        /**
         * Filters the grid
         */
        filter: function(data){
            this.$datagrid.filter(data);
        },


        /**
         * Toggle the collapsed/expanded state of this item
         */
        toggle: function(e){
            if (e) e.stopImmediatePropagation();
            this.toggleElement($(this.el).find('.item-header'));
            this.toggleElement($(this.el).find('.item-content'));
        },


        /**
         * @param element
         */
        toggleElement: function(element){
            element.toggleClass('expanded');
            element.trigger('expandedChange');
        }


    });


    return EventView;
});
