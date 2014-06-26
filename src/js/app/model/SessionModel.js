define([
    'marionette',
    'app/model/models/session/Login'
],
function (Marionette, Login) {
    return Marionette.Controller.extend({
        dependencies: 'vent',
        autoAuthenticate: true,


        ready: function(){
          this.vent.bind('session:logout');
          this.recoverLogin();
        },


        /**
         * @returns {boolean}
         */
        isLoggedIn: function() {
            return this.store.check('session');
        },


        /**
         * @param lgn
         */
        addLogin: function(lgn){
            this.store.set("session", lgn);
            this.vent.trigger('session:loggedin', lgn);
        },


        /**
         *
         */
        clearLogin: function(){
            this.store.clear("session");
            this.vent.trigger('session:loggedout', lgn);
        },


        /**
         * Recovers any session data from the sessionStorage
         * to automatically log the user back in
         */
        recoverLogin: function(){
            var localSession = this.store.get("session");
            if (localSession != null) {
                this.addLogin(localSession);
            }
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
        },


        /**
         * Stores
         */
        store : {
            get: function( name ) {
                return sessionStorage.getItem( name );
            },
            set: function( name, val ){
                return sessionStorage.setItem( name, val );
            },
            check: function( name ){
                return ( sessionStorage.getItem( name ) == null );
            },
            clear: function( name ){
                return sessionStorage.removeItem( name );
            }
        },
    });
});
