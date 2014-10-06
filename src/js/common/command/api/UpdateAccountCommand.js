define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * @param model Management.as
         * @returns {*}
         */
        execute: function(model){
            var service = ctx.get('apiService');
            return service.updateAccount(
                model.accountId,
                model.status,
                model.password,
                model.firstName,
                model.lastName,
                model.phone,
                model.email,
                model.minStake,
                model.betLimit,
                model.pt,
                model.vc,
                model.balance);
        }
    });
});