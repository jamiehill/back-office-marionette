define(function (require) {
    var App = require('App'),
        Service = require('common/backbone/Backbone.Service');

    return Service.extend({


        url: App.endpoint,
        targets: {
            'login'                             : { method: 'post', args: ['username', 'password', { 'application': 'application' }] },
            'keepAlive'                         : [{ sessionToken: 'sessionToken' }],

            'getEvent'                          : ['eventId', 'channelId', 'locale'],
            'getFullEventDetails'               : { method: 'getjson', args: ['eventId', { 'includeDescendants':'true', 'includeInstruments':'true', 'includeSettlement':'true', 'sessionToken': 'sessionToken' }]},

            'sportsRootNodes'                   : 'get',
            'sportsNode'                        : [ 'nodeId' ],
            'eventSearch'                       : [ 'pattern', { 'includePastEvents': false } ],
            'eventSearchByCriteria'             : [ 'criteria' ],
            'sportMarkets'                      : [ 'sportNodeId' ],
            'marketSearch'                      : [ 'pattern' ],

            'countPunters'                      : [{ 'userName': '', 'firstName': '', 'lastName': '', 'currency': '', 'country': '', 'startDate': '', 'endDate': '', 'sessionToken': 'sessionToken' }],
            'searchPunters'                     : [{ 'userName': '', 'firstName': '', 'lastName': '', 'currency': '', 'country': '', 'startDate': '', 'endDate': '', 'sessionToken': 'sessionToken' }],

            'countBets'                         : [{ 'placedTime': '', 'accountId': '', 'channelId': '', 'status': '', 'eventId': '', 'marketId': '', 'instrumentId': '', 'sessionToken': 'sessionToken' }],
            'searchBets'                        : [{ 'placedTime': '', 'accountId': '', 'channelId': '', 'status': '', 'eventId': '', 'marketId': '', 'instrumentId': '', 'sessionToken': 'sessionToken' }],
            'getBet'                            : [{ 'accountId':'','betId':'','sessionToken':'sessionToken' }],
            'getChildBets'                      : [{ 'accountId':'','betId':'','sessionToken':'sessionToken' }],
            'amendBets'                         : [{ 'amendment':'','sessionToken':'sessionToken' }],

            'searchCompetitorTranslations'      : { method: 'get',  args: ['compName',      { 'sessionToken':'sessionToken' }]},
            'saveCompetitorTranslations'        : { method: 'post', args: ['translations',  { 'sessionToken':'sessionToken' }]},
            'uploadCompetitorTranslationsCSV'   : { method: 'post', args: ['base64Csv',     { 'sessionToken':'sessionToken' }]},
            'searchMarketTypeTranslations'      : { method: 'get',  args: ['name',          { 'sessionToken':'sessionToken' }]},
            'saveMarketTypeTranslations'        : { method: 'post', args: ['translations',  { 'sessionToken':'sessionToken' }]},
            'uploadMarketTypeTranslationsCSV'   : { method: 'post', args: ['base64Csv',     { 'sessionToken':'sessionToken' }]},
            'searchSelectionTypeTranslations'   : { method: 'get',  args: ['name',          { 'sessionToken':'sessionToken' }]},
            'saveSelectionTypeTranslations'     : { method: 'get',  args: ['translations',  { 'sessionToken':'sessionToken' }]},
            'uploadSelectionTypeTranslationsCSV': { method: 'post', args: ['base64Csv',     { 'sessionToken':'sessionToken' }]},

            'locales'                           : [{ 'sessionToken':'sessionToken' }]
        },


        defaults: {
            sessionToken: function(){
                return App.models.commo;
            },
            application: function(){
                return App.appName;
            }
        }
    });
});