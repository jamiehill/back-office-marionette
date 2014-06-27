define(['marionette', 'ctx', 'app/view/popups/login/LoginPopup'],
    function (Marionette, ctx) {
    return Marionette.View.extend({
        dependencies: 'vent, commands',


        /**
         *
         */
        initialize: function(){
            _.bindAll(this, 'onClick', 'onSessionChanged', 'showPopup');
        },


        /**
         *
         */
        ready: function(){
            this.vent.bind('session:loggedin', this.onSessionChanged);
            this.vent.bind('session:loggedout', this.onSessionChanged);
        },

        /**
         *
         */
        onShow: function() {
            this.modalEl = $('body').find('#modals');
            this.loginPopup = ctx.get('loginPopup');
            this.initToolbar();
        },


        /**
         * Build main grid
         */
        initToolbar: function(){
            var scope = this;

            if (w2ui.appToolbar)
                $(this.el).w2render(w2ui.appToolbar);
            else {
                $(this.el).w2toolbar({
                    name: 'appToolbar',
                    items: scope.items(scope),
                    style: "background: transparent;",
                    onClick: function(e){
                        scope.onClick(e, scope);
                    }
                });
            }
        },


        /**
         * @param e
         * @param scope
         */
        onClick: function(e, scope){
            if (e.target == 'login') {
                this.showPopup();

            } else if (e.target == 'logout'){
                this.commands.execute('command:logout');

            } else if (e.target == 'searchPunters'){
            } else if (e.target == 'translations');
        },


        /**
         * @param e
         */
        onSessionChanged: function(lgn){
            this.loggedOut = _.isUndefined(lgn);
            if (this.loggedOut) this.showPopup();

            if (w2ui['appToolbar']){
                w2ui['appToolbar'].set('login',         { hidden: !this.loggedOut });
                w2ui['appToolbar'].set('logout',        { hidden: this.loggedOut });
                w2ui['appToolbar'].set('searchPunters', { hidden: this.loggedOut });
                w2ui['appToolbar'].set('translations',  { hidden: this.loggedOut });
                w2ui['appToolbar'].refresh();
            }
        },


        /**
         * Show the login popup
         */
        showPopup: function(){
            if (_.isUndefined(this.loginPopup)) return;
            $(this.modalEl).html(this.loginPopup.render().el);
        },


        /**
         * Items settings for tool bar
         */
        items: function(scope){
            return [
                { type: 'html',  id: 'logo', caption: '',html: '<img src="./img/amelco_sm.png" style="padding-left: 5px; padding-top: 3px"></img>' },
                { type: 'button',  id: 'login', caption: 'Login', hint: 'Login', hidden:!this.loggedOut },
                { type: 'button',  id: 'logout', caption: 'Logout', hint: 'Logout', hidden:this.loggedOut },
                { type: 'button',  id: 'searchPunters', caption: 'Search Punters', hint: 'Search Punters', hidden:this.loggedOut },
                { type: 'button',  id: 'translations', caption: 'Translations', hint: 'Translations', hidden:this.loggedOut }
            ];
        }
    });
});