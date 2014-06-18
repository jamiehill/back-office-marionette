define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            username: '',
            password: '',
            sessionToken: '',
            accountId: 0,
            accountBalance: '',
            currency: ''
        },

        parse: function(resp) {
            this.set('accountId', resp.accountId);
            this.set('username', resp.username || resp.name);
            this.set('password', resp.password);
            this.set('sessionToken', resp.sessionToken);
            this.set('accountBalance', resp.accountBalance.value);
            this.set('currency', resp.accountBalance.currency);
            return resp;
        }
    });
});