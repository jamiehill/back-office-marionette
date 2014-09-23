/**
 * Created by Jamie on 22/09/2014.
 */
define(['marionette', 'ctx', 'text!app/view/main/markets/MarketsView.tpl.html', 'app/view/search/SearchView'],

    function (Marionette, ctx, tpl, SearchView) {
        return Marionette.Layout.extend({


            template: _.template(tpl),
            regions: {
                "contentRegion": "#markets",
                "searchRegion": "#search"
            },


            /**
             * Main initialisation
             */
            onShow: function() {
                this.contentRegion.show(ctx.get("marketDetailsView"));
                this.searchRegion.show(new SearchView());
            }
        });
    });