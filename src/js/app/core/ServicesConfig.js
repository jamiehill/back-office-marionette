define([
    'common/bootstrap/core/DeferredBase','ctx',
    'common/command/api/LoginCommand',
    'common/command/api/LogoutCommand'
],
function (DeferredBase, ctx, Login, Logout) {
    return DeferredBase.extend({
        name: 'ServicesConfig',


        /**
         * Set up the IoC context
         */
        init: function() {
            this.app = this.options.app;

            this.app.commands.setHandler("command:login", Login);
            this.app.commands.setHandler("command:logout", Logout);
            this.app.commands.setHandler("command:recoverlogin", Logout);

            this.success();
        }
    })
});
