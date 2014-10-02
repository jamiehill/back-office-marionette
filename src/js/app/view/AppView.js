define([
    'marionette', 'ctx',
    'text!app/view/AppView.tpl.html',
    'app/view/main/components/alerts/AlertView'
],

function (Marionette, ctx, tpl, AlertView) {
    return Marionette.LayoutView.extend({


        template: _.template(tpl),
        defaultView: 'accountOverview',
        regions: {
            "navRegion": ".nav-global",
            "alertRegion": ".alert-global",
            "contentRegion": "#tabContent"
        },


        events: {
            'click #loginBtn' : 'onLogin',
            'click #tabs ul li a' : 'onTabClick'
        },


        /**
         *
         */
        initialize: function(){
            _.bindAll(this, 'onTabClick');
            this.modalEl = $('body').find('#modals');
        },


        /**
         * Main initialisation
         */
        onShow: function() {
//            this.navRegion.show(ctx.get("navBarView"));
            this.contentRegion.show(this.getView());
            this.alertRegion.show(new AlertView());

            // activate default tab
            this.currentTab = $('#'+this.defaultView).closest('li');
            this.currentTab.addClass('ui-tabs-active ui-state-active');
        },


        onLogin: function() {
            var popup = ctx.get('loginPopup');
            $(this.modalEl).html(popup.render().el);
        },


        /**
         * @param event
         */
        onTabClick: function(event) {
            var view = $(event.currentTarget).attr('id');
            this.contentRegion.show(ctx.get(view));

            this.currentTab.removeClass('ui-tabs-active ui-state-active');
            this.currentTab = $('#'+view).closest('li');

            this.currentTab.addClass('ui-tabs-active ui-state-active');
        },


        /**
         * Returns the correct view for the specified tab
         * @returns {*|MarketDetailsView}
         */
        getView: function(){
            this.currentTab = $('#'+this.defaultView);
            return ctx.get(this.defaultView);
        }
    });
});