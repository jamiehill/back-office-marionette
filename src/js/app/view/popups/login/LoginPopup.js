define(['backbone', 'ctx', 'app/model/models/session/Login', 'text!app/view/popups/login/LoginPopup.tpl.html'],
function (Backbone, ctx, Login, tpl) {
    return Backbone.Modal.extend({


        dependencies: 'apiService, sessionModel',
        template: _.template(tpl),
        submitEl: '.submit',
        cancelEl: '.clear',


        /**
         *
         */
        initialize: function(){
            _.bindAll(this, 'loginSuccess', 'loginFailure');
        },


        /**
         * Check both fields have been populated
         */
        beforeSubmit: function(e){
            this.user = $(this.el).find('#username').val();
            this.pass = $(this.el).find('#password').val();
            return $.trim(this.user).length > 0 && $.trim(this.pass).length > 0;
        },


        /**
         *
         */
        submit: function(e){
            var promise = this.apiService.login(this.user, this.pass);
            promise.then(this.loginSuccess, this.loginFailure, this.loginFailure);
        },


        /**
         * Login successful.  Close popup
         * @param e
         */
        loginSuccess: function(e){
            if (_.has(e, 'Error'))
                this.loginFailure(e);
            else if (_.has(e, 'Login')){
                this.sessionModel.addLogin(e.Login);
                this.close();
            }
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