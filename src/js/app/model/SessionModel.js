define([
    'marionette',
    'app/model/models/session/Login'
],
function (Marionette, Login) {
    return Marionette.Controller.extend({
        dependencies: 'vent',


        ready: function(){
          this.vent.bind('session:logout')
        },


        /**
         * @returns {boolean}
         */
        isLoggedIn: function() {
            return !_.isUndefined(this.login);
        },


        /**
         * @param lgn
         */
        addLogin: function(lgn){
            this.login = new Login(lgn);
            this.vent.trigger('session:loggedin', this.login);
        },


        /**
         *
         */
        clearLogin: function(){
            this.login = undefined;
            this.vent.trigger('session:loggedout', this.login);
        },


        /**
         * @returns {*}
         */
        getBalance: function(){
            return this.isLoggedIn() ? this.login.get('accountBalance') : '0';
        },


        /**
         * @param bln
         */
        setBalance: function(bln){
            if (!this.isLoggedIn()) return;
            this.login.set('accountBalance', bln);
        },


        /**
         * @returns {*}
         */
        getUsername: function(){
            return this.isLoggedIn() ? this.login.get('username') : '';
        },


        /**
         * @returns {*}
         */
        getSessionToken: function(){
            return this.isLoggedIn() ? this.login.get('sessionToken') : '';
        },


        /**
         * @returns {*}
         */
        getAccountId: function(){
            return this.isLoggedIn() ? this.login.get('accountId') : '';
        }
    });
});
