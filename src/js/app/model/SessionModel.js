define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({


        dependencies: 'vent',
        defaults: {
            accountId: '-',
            username: '-',
            password: '-',
            sessionToken: '-',
            accountBalance: {
                value: '0',
                currency: '£'
            }
        },


        /**
         * Once dependencies have been satisfied, do a 'recovery'
         * to get current authenticated status, thereby launching
         * login popup should a valid session not be available
         */
        ready: function(){
            this.recoverSession();
        },


        /**
         * @returns {boolean}
         */
        isLoggedIn: function() {
            return this.store.check('session');
        },
        isNotLoggedIn: function() {
            return !this.isLoggedIn();
        },


        /**
         * @param lgn
         */
        storeSession: function(lgn){
            this.set(lgn);
            this.store.update(this);
            this.vent.trigger('session:loggedin', lgn);
        },


        /**
         *
         */
        clearSession: function(){
            this.store.clear();
            this.vent.trigger('session:loggedout');
        },


        /**
         * Recovers any session data from the sessionStorage
         * to automatically log the user back in
         */
        recoverSession: function(){
            var localSession = this.store.get("session");
            if (localSession != null)
                this.storeSession(JSON.parse(localSession));
            else this.clearSession();
        },


        /**
         * @returns {*}
         */
        getBalance: function(){
            return this.get('accountBalance').value;
        },


        /**
         * @param bln
         */
        setBalance: function(bln){
            if (!this.isLoggedIn()) return;
            this.set('accountBalance', bln);
            this.store.update(this);
        },


        /**
         * @returns {*}
         */
        getUsername: function(){
            return this.get('username');
        },


        /**
         * @returns {*}
         */
        getSessionToken: function(){
            return this.get('sessionToken');
        },


        /**
         * @returns {*}
         */
        getAccountId: function(){
            return this.get('accountId');
        },


        /**
         * Stores
         */
        store : {
            get: function() {
                return sessionStorage.getItem('session');
            },
            check: function(){
                return sessionStorage.getItem('session') != null;
            },
            clear: function(){
                return sessionStorage.removeItem('session');
            },
            update: function(scope){
                var json = scope.changed;
                sessionStorage.setItem("session", JSON.stringify(json));
            }
        }
    });
});
