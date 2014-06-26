define([
    'common/bootstrap/core/DeferredBase','ctx',
    '../../common/command/api/LoginCommand',
    '../../common/command/api/LogoutCommand'
],
function (DeferredBase, ctx, Login, Logout) {
    return DeferredBase.extend({
        name: 'ServicesConfig',


        /**
         * Set up the IoC context
         */
        init: function() {
            this.app = this.options.app;

            this.app.commands.setHandler("command:login", Command);
            this.app.commands.setHandler("command:logout", LogoutCommand);
            this.app.commands.setHandler("command:recoverlogin", LogoutCommand);

            this.success();
        }
    })
});
