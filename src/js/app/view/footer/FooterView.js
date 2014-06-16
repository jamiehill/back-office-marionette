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

            },


            /**
             * Items settings for tool bar
             */
            items: function(scope){
                return [
                    { type: 'button',  id: 'loginModal', caption: 'Login',    hint: 'Login' },
                    { type: 'button',  id: 'searchPunters', caption: 'Search Punters', hint: 'Search Punters',hidden:false },
                    { type: 'button',  id: 'translations', caption: 'Translations', hint: 'Translations',hidden:false }
                ];
            }
        });
    });