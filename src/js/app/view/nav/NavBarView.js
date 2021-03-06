define(['marionette', 'ctx', 'app/view/popups/login/LoginPopup'],
    function (Marionette, ctx) {
    return Marionette.View.extend({
        dependencies: 'vent, commands',


        /**
         *
         */
        initialize: function(){
            _.bindAll(this, 'onClick', 'onSessionChanged', 'showPopup');
            this.modalEl = $('body').find('#modals');
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
            var popup = ctx.get('loginPopup');
            $(this.modalEl).html(popup.render().el);
        },


        /**
         * Items settings for tool bar
         */
        items: function(scope){
            return [
                { type: 'html',    id: 'logo', caption: '', html: '<img id="appLogo" src="./img/logo-sml.gif"></img>' },
                { type: 'spacer' },
                { type: 'button',  id: 'login', caption: 'Login', hint: 'Login', hidden:!this.loggedOut },
                { type: 'button',  id: 'logout', caption: 'Logout', hint: 'Logout', hidden:this.loggedOut },
                { type: 'button',  id: 'searchPunters', caption: 'Search Punters', hint: 'Search Punters', hidden:this.loggedOut },
                { type: 'button',  id: 'translations', caption: 'Translations', hint: 'Translations', hidden:this.loggedOut }
            ];
        }
    });
});