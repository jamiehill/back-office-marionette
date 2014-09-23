define([
        'marionette'
    ],
    function (Marionette) {
        return Marionette.ItemView.extend({

            template: "<div>Account Overview</div>",
            tagName: "li",
            selectedIndex: 0,
            events: {

            }
        });
    });