define([
        'marionette'
    ],
    function (Marionette) {
        return Marionette.ItemView.extend({

            template: "<div>Account Bets</div>",
            tagName: "li",
            selectedIndex: 0,
            events: {

            },


            /**
             *
             */
            initialize: function(){
                this.listenTo(this.model, 'change:display', this.render);
            }
        });
    });