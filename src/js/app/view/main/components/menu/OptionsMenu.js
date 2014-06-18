define([
        'marionette',
        'text!app/view/main/markets/sports/templates/OptionsMenu.tpl.html'
    ],

    function (Marionette, optionsMenu) {
        'use strict';

        var OptionsMenu = Marionette.View.extend({


            el: 'body',
            events: {
                "click #optionsMenu" : "onMenuClick"
            },


            /**
             * Initialize the menu
             */
            initialize: function(){
                _.bindAll(this, 'close', 'onMenuClick');
//                this.template = _.template(optionsMenu,
//                    this.options.model.attributes);
                $(document).click(this.close);
            },


            /**
             *
             */
            open: function(e, options){
                $('.optionsMenuPopup').remove();

                var top  = $(e.target).offset().top + 12,
                    left = $(e.target).offset().left - 3,
                    opts = _.extend({}, options, {
                        style: 'top:'+top+'px;left:'+left+'px'
                    });

                this.template = _.template(optionsMenu, opts);
                $(this.template).prependTo('body');

                this.delegateEvents();
            },


            /**
             *
             */
            close: function(e){
                var $menu = $('body > ul.optionsMenuPopup');
                if (!$menu.length) return;

                var iconId = e.target.dataset.id;
                if (!$menu.hasClass(iconId))
                    this.onClose();
            },


            // Handlers


            /**
             * Menu item selected
             * @param e
             */
            onMenuClick: function(e){
                var option = e.target.id,
                    id = $(e.target).attr('data-id'),
                    isMarket = $(e.target).attr('data-is-market');
                this.trigger('select', {option: option, id:id, isMarket:isMarket});
                this.onClose();
            },


            /**
             * Internal close
             */
            onClose: function(e){
                if (e) e.stopImmediatePropagation();
                $('.optionsMenuPopup').remove();
                this.undelegateEvents();
            }


        });


        return OptionsMenu;
    });
