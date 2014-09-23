define([
        'marionette'
    ],
    function (Marionette) {
        return Marionette.ItemView.extend({

            template: "<div>Account Creation</div>",
            tagName: "li",
            selectedIndex: 0,
            events: {

            }
        });
    });