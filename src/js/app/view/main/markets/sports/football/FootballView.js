define([
        'marionette',
        'app/view/main/markets/sports/BaseView',
        'app/view/main/markets/sports/football/FootballViewPM'
    ],

    function (Marionette, BaseView, FootballViewPM) {
        'use strict';

        var FootballView = BaseView.extend({
            pm: new FootballViewPM()
        });


        return FootballView;
    });
