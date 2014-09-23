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

//            if (w2ui.mainToolbar)
//                this.el.w2render(w2ui.mainToolbar);
//            else {
//                $(this.el).w2toolbar({
//                    name: 'mainToolbar',
//                    items: scope.items(scope),
//                    style: "padding: 0px 0px; height: 30px; vertical-align: middle"
//                });
//            }
        },


        /**
         * Items settings for tool bar
         */
        items: function(scope){
            return [
                { type: 'spacer'},
                { type: 'button',  id: 'loginModal', caption: 'Login',    hint: 'Login' },
                { type: 'button',  id: 'searchPunters', caption: 'Search Punters', hint: 'Search Punters',hidden:false },
                { type: 'button',  id: 'translations', caption: 'Translations', hint: 'Translations',hidden:false }
            ];
        }
    });
});