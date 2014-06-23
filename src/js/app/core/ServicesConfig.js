define([
    'common/bootstrap/core/DeferredBase','ctx',
    'common/command/api/Login',
    'common/command/api/Logout'
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

            this.success();
        }
    })
});
