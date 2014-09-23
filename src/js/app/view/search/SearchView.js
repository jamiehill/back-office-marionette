define(['marionette', 'ctx', 'text!app/view/search/SearchView.tpl.html'],
function (Marionette, ctx, tpl) {

    return Marionette.LayoutView.extend({


        id: 'tabsWrapper',
        template: _.template(tpl),
        regions: {
            "tabRegion": "#tabs",
            "contentRegion": "#tab-content"
        },


        /**
         * Build main grid
         */
        onShow: function(){
            this.simple = ctx.get('simpleSearchView');
            this.advanced = ctx.get('advancedSearchView');

            var scope = this;
            $('#tabs').w2tabs({
                name: 'searchTabs',
                active: 'simple',
                style: "background: transparent;",
                onClick : function(e){
                    scope.onClick(e, scope);
                },
                tabs: [
                    { id: 'simple', caption: 'Search' },
                    { id: 'advanced', caption: 'Advanced' }
                ]
            });

            this.contentRegion.show(this.simple);
        },


        /**
         * @param e
         */
        onClick: function(e, scope){
            if (e.target == 'simple')
                scope.contentRegion.show(scope.simple);
            if (e.target == 'advanced')
                scope.contentRegion.show(scope.advanced);
        }
    });
});
