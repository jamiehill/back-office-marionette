define(['marionette', 'ctx', 'text!app/view/AppView.tpl.html', 'app/view/nav/NavBarView', 'app/view/header/HeaderView', 'app/view/search/SearchView', 'app/view/footer/FooterView', 'app/view/main/markets/MarketDetailsView'],

    function (Marionette, ctx, tpl, NavBarView, HeaderView, SearchView, FooterView, MarketDetailsView) {
    return Marionette.Layout.extend({


        template: _.template(tpl),
        regions: {
            "navRegion": "#nav",
            "headerRegion": "#header",
            "contentRegion": "#main",
            "searchRegion": "#search",
            "footerRegion": "#footer"
        },


        /**
         * Main initialisation
         */
        onShow: function() {
            this.navRegion.show(ctx.get("navBarView"));
            this.headerRegion.show(new HeaderView());
            this.contentRegion.show(this.getView());
            this.footerRegion.show(new FooterView());
        },


        /**
         * Returns the correct view for the specified tab
         * @returns {*|MarketDetailsView}
         */
        getView: function(){
            return ctx.get("agentView");
        }
    });
});