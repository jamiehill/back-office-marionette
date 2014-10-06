define(function (require) {
    var Service = require('common/framework/service/Backbone.Service');
    return Service.extend({
        dependencies: 'url=endpoint, session=sessionModel, appid',
        defaults: {
            sessionToken: function(){
                return this.session.getSessionToken();
            },
            application: function(){
                return this.appid;
            }
        },


        targets: {
            login: {
                method: 'post',
                args: [
                    'username',
                    'password',
                    { application: { attr: 'application' }}
                ]
            },

            logout: {
                method: 'post',
                args: [
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            keepAlive: {
                args: [
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            getEvent: {
                args: [
                    'eventId',
                    'channelId',
                    'locale'
                ]
            },

            getFullEventDetails: {
                method: "getjson",
                args: [
                    'eventId',
                    { includeDescendants: 'true' },
                    { includeInstruments: 'true' },
                    { includeSettlement: 'true' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            sportsRootNodes: '',
            sportsNode: [ 'nodeId' ],
            eventSearch: {
                args: [
                    'pattern',
                    { includePastEvents: false }
                ]
            },
            eventSearchByCriteria: ['criteria'],
            sportMarkets: ['sportNodeId'],
            marketSearch: ['pattern'],

            countPunters: {
                args: [
                    { userName: '' },
                    { firstName: '' },
                    { lastName: '' },
                    { currency: '' },
                    { country: '' },
                    { startDate: '' },
                    { endDate: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            searchPunters: {
                args: [
                    { userName: '' },
                    { firstName: '' },
                    { lastName: '' },
                    { currency: '' },
                    { country: '' },
                    { startDate: '' },
                    { endDate: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            countBets: {
                args: [
                    { placedTime: '' },
                    { accountId: '' },
                    { channelId: '' },
                    { status: '' },
                    { eventId: '' },
                    { marketId: '' },
                    { instrumentId: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            'searchBets': {
                args: [
                    { placedTime: '' },
                    { accountId: '' },
                    { channelId: '' },
                    { status: '' },
                    { eventId: '' },
                    { marketId: '' },
                    { instrumentId: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            getBet: {
                args: [
                    { accountId: '' },
                    { betId: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },


            getChildBets: {
                args: [
                    { accountId: '' },
                    { betId: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            amendBets: {
                args: [
                    { amendment: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },


            searchCompetitorTranslations: {
                args: [
                    'compName',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            saveCompetitorTranslations: {
                method: 'post',
                args: [
                    'translations',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            uploadCompetitorTranslationsCSV: {
                method: 'post',
                args: [
                    'base64Csv',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            searchMarketTypeTranslations: {
                args: [
                    'name',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            searchMarketTypeTranslations: {
                method: 'post',
                args: [
                    'translations',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            uploadMarketTypeTranslationsCSV: {
                method: 'post',
                args: [
                    'base64Csv',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            searchSelectionTypeTranslations: {
                args: [
                    'name',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            saveSelectionTypeTranslations: {
                args: [
                    'translations',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            uploadSelectionTypeTranslationsCSV: {
                method: 'post',
                args: [
                    'base64Csv',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            locales: {
                args: [
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },


            // agent api
            getChildAccounts: {
                args: [
                    'accountId',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            checkAccountAvailability: {
                args: [
                    'accountref',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            createChildAccount: {
                args: [
                    { username: '' },
                    { password: '' },
                    { firstname: '' },
                    { lastname: '' },
                    { phone: '' },
                    { email: '' },
                    { product: '' },
                    { minstake: '' },
                    { betlimit: '' },
                    { pt: '' },
                    { vc: '' },
                    { currency: '' },
                    { balance: '' },
                    { accountref: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            uploadChildAccountsCSV: {
                args: [
                    { base64Csv: '' },
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            //accountId=N&accountstatus=ACTIVE|SUSPENDED|CLOSED&password=X&firstname=X&lastname=X&phone=X&email=X&minstake=X&betlimit=X&pt=X&vc=X&balance=X

            updateAccount: {
                args: [
                    'accountId',
                    'accountstatus',
                    'password',
                    'firstname',
                    'lastname',
                    'phone',
                    'email',
                    'minstake',
                    'betlimit',
                    'pt',
                    'vc',
                    'balance'
                ]
            }
        }
    });
});