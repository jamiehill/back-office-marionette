define([
    'common/bootstrap/core/DeferredBase','ctx',
    'common/command/api/LoginCommand',
    'common/command/api/LogoutCommand',
    'common/command/api/GetChildAccountsCommand',
    'common/command/api/CreateChildAccountCommand',
    'common/command/api/CheckAccountAvailabilityCommand',
    'common/command/user/ChangePasswordCommand'
],
function (DeferredBase, ctx, Login, Logout, GetChildAccountsCommand, CreateChildAccountCommand, CheckAccountAvailabilityCommand, ChangePasswordCommand) {
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

            this.app.commands.setHandler("command:getChildAccounts", GetChildAccountsCommand);
            this.app.commands.setHandler("command:createChildAccount", CreateChildAccountCommand);
            this.app.commands.setHandler("command:checkAccountAvailability", CheckAccountAvailabilityCommand);

            this.app.commands.setHandler("command:changePassword", ChangePasswordCommand);

            this.success();
        }
    })
});
