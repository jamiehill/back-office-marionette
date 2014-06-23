define([
        'marionette', 'moment',

        'text!app/view/search/advanced/AdvancedSearchView.tpl.html',
        'text!app/view/search/simple/SearchInput.tpl.html'
    ],

    function (Marionette, moment, tpl, filterTpl) {
        return Marionette.View.extend({


            events: {
                "keyup .searchInput": "onSearch"
            },


            /**
             *
             */
            onShow: function(){
                var template = _.template(tpl, {});
                this.$el.html(template);

                this.initToolbar();
            },


            /**
             * Build main grid
             */
            initToolbar: function(){
                var scope = this,
                    element = $(this.el).find('#advancedToolbar');

                if (w2ui.advancedToolbar)
                    element.w2render(w2ui.advancedToolbar);
                else {
                    $(element).w2toolbar({
                        name: 'advancedToolbar',
                        items: scope.items(scope),
                        style: "padding: 7px 6px 7px 6px"
                    });
                }
            },


            /**
             * Items settings for tool bar
             */
            items: function(scope){
                return [
                    {type: 'html',  id: 'filter', html: _.template(filterTpl, {icon: '', tooltip:'Search for Events'})},
                    {type: 'spacer'},
                    {type: 'break'},
                    {type: 'check',  id: 'past', caption: '', img: 'fa fa-history fa-fw', checked: false, hint: 'Include all past Events in search' }
                ];
            },
        });
    });
