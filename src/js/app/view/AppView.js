define(['marionette', 'templates', 'app/view/header/HeaderView', 'app/view/tools/ToolsView', 'app/view/aside/SearchView', 'app/view/footer/FooterView', 'app/view/main/MarketDetailsView'],

    function (Marionette, templates, HeaderView, ToolsView, SearchView, FooterView, MarketDetailsView, models, services) {
    return Marionette.Layout.extend({


        template: templates.appView,
        regions: {
            "headerRegion": "#header",
            "toolsRegion": "#tools",
            "contentRegion": "#main-content",
            "sidebarRegion": "#sidebar",
            "footerRegion": "#footer"
        },


        /**
         * Main initialisation
         */
        onShow: function() {
            this.headerRegion.show(new HeaderView());
            this.toolsRegion.show(new ToolsView());
            this.contentRegion.show(this.getView());
            this.sidebarRegion.show(new SearchView());
            this.footerRegion.show(new FooterView());
        },


        /**
         * Returns the correct view for the specified tab
         * @returns {*|MarketDetailsView}
         */
        getView: function(){
            return new MarketDetailsView();
        }
    });
});