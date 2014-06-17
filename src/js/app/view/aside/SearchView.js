define(['marionette', 'moment', 'app/view/aside/simple/SimpleSearchView','app/view/aside/advanced/AdvancedSearchView', 'text!app/view/aside/SearchView.tpl.html'],
    function (Marionette, moment, SimpleSearchView, AdvancedSearchView, tpl) {
    return Marionette.Layout.extend({


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
            this.simple = new SimpleSearchView();
            this.advanced = new AdvancedSearchView();

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
