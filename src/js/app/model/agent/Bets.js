define(['backbone', 'app/model/models/Instrument'],
function (Backbone, Instrument) {
    return Backbone.Model.extend({

        defaults: {
            name: 'BETS',
            title: 'Account Bets',
            clazz: 'accountBets',

            accountId: 'K8-01-101-1234',
            username: 'jhchill765',
            login: 'jhchill666',
            status: 'Suspended',
            firstName: 'James',
            lastName: 'Hill',
            phone: '02077366251',
            email: 'jhill@amelco.co.uk',
            lastLogin: new Date(),
            ip: '192.168.0.1',
            currency: 'GBP',
            pt: 100,
            vc: 50,
            rows: null,
            betLimit: 999,
            minStake: 0,
            balance: 100
        }
    });
});