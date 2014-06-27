define(['backbone', 'ctx', 'app/model/models/session/Login', 'text!app/view/popups/login/LoginPopup.tpl.html'],
function (Backbone, ctx, Login, tpl) {
    return Backbone.Modal.extend({
        template: _.template(tpl),


        dependencies: 'apiService, sessionModel, commands',
        submitEl: '.submit',
        clearEl: '.clear',
        clickOutside: false,
        regionEnabled: true,


        events: {
            'click .clear': 'clear'
        },



        /**
         *
         */
        initialize: function(){
            _.bindAll(this, 'loginSuccess', 'loginFailure');
        },


        /**
         * Focus the username input
         */
        onOpened: function(){
            this.clear();
        },


        /**
         * Check both fields have been populated
         */
        beforeSubmit: function(e){
            this.user = $('input[name=username]').val();
            this.pass = $('input[name=password]').val();
            return $.trim(this.user).length > 0 && $.trim(this.pass).length > 0;
        },


        /**
         *
         */
        submit: function(e){
            this.commands.execute('command:login', this.user, this.pass)
                .then(this.loginSuccess, this.loginFailure, this.loginFailure);
        },


        /**
         *
         */
        clear: function(e){
            $('input[name=username]').val('');
            $('input[name=password]').val('');
            setTimeout(function(){
                $('input[name=username]').focus();
            }, 50);
        },



        /**
         * Login successful.  Close popup
         * @param e
         */
        loginSuccess: function(e){
            this.close();
        },


        /**
         * Login failed - show some feedback
         * @param e
         */
        loginFailure: function(e){
            var error = e.Error.value,
                feedback = $(this.el).find('#feedback');
            feedback.html(error);
        }
    });
});