define(['marionette'],
function (Marionette) {
    return Marionette.ItemView.extend({

        template: "<div>Hello, I'm Tab Content</div>",
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