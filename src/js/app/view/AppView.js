define(['marionette', 'ctx', 'text!app/view/AppView.tpl.html', 'app/view/header/HeaderView', 'app/view/tools/ToolsView', 'app/view/aside/SearchView', 'app/view/footer/FooterView', 'app/view/main/markets/MarketDetailsView'],

    function (Marionette, ctx, tpl, HeaderView, ToolsView, SearchView, FooterView, MarketDetailsView) {
    return Marionette.Layout.extend({


        template: _.template(tpl),
        regions: {
            "headerRegion": "#header",
            "toolsRegion": "#tools",
            "contentRegion": "#main",
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
            return ctx.get("marketDetailsView");
        }
    });
});