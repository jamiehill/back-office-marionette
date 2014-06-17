define(['marionette'],
    function (Marionette) {
    return Marionette.View.extend({


        onShow: function() {
            this.initToolbar();
        },


        /**
         * Build main grid
         */
        initToolbar: function(){
            var scope = this;

            if (w2ui.appToolbar)
                this.el.w2render(w2ui.appToolbar);
            else {
                $(this.el).w2toolbar({
                    name: 'appToolbar',
                    items: scope.items(scope),
                    style: "background: transparent;"
                });
            }
        },


        /**
         * Items settings for tool bar
         */
        items: function(scope){
            return [
                { type: 'html',  id: 'logo', caption: '',html: '<img src="./img/amelco_sm.png" style="padding-left: 5px; padding-top: 3px"></img>' },
                { type: 'button',  id: 'loginModal', caption: 'Login', hint: 'Login' },
                { type: 'button',  id: 'searchPunters', caption: 'Search Punters', hint: 'Search Punters',hidden:false },
                { type: 'button',  id: 'translations', caption: 'Translations', hint: 'Translations',hidden:false }
            ];
        }
    });
});