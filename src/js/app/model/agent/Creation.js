define(['backbone', 'app/model/models/Instrument'],
function (Backbone, Instrument) {
    return Backbone.Model.extend({

        defaults: {
            // internal
            name: 'CREATION',
            title: 'Account Creation',
            clazz: 'accountCreation',

            // creation props
            accountId: 'K8-01-101-1234',
            login: 'jhchill666',
            password: 'password',
            firstName: 'James',
            lastName: 'Hill',
            phone: '02077366251',
            email: 'jhill@amelco.co.uk',
            balance: 100,
            currency: 'GBP',
            betLimit: 999,
            minStake: 0,
            pt: 100,
            vc: 50
        }
    });
});