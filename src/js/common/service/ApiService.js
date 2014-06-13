define(function (require) {
    var App = require('App'),
        Service = require('common/backbone/Backbone.Service');

    return Service.extend({
        url: App.endpoint,
        targets: {
            'login': 'post',
            'login': { method:'post', args:['username','password'] },
            'keepAlive': 'get',

            'getEvent': 'get',
            'getFullEventDetails': 'get',

            'sportsRootNodes': 'post',
            'sportsNode': 'post',
            'eventSearch': 'post',
            'eventSearchByCriteria': 'post',
            'sportMarkets': 'post',
            'marketSearch': 'post',

            'countPunters': 'post',
            'searchPunters': 'post',

            'countBets': 'post',
            'searchBets': 'post',
            'getBet': 'post',
            'getChildBets': 'post',
            'amendBets': 'post',

            'searchCompetitorTranslations': 'post',
            'saveCompetitorTranslations': 'post',
            'uploadCompetitorTranslationsCSV': 'post',
            'searchMarketTypeTranslations': 'post',
            'saveMarketTypeTranslations': 'post',
            'uploadMarketTypeTranslationsCSV': 'post',
            'searchSelectionTypeTranslations': 'post',
            'saveSelectionTypeTranslations': 'post',
            'uploadSelectionTypeTranslationsCSV': 'post',

            'locales': 'post'
        },


        target: function(){

        }

    });
});