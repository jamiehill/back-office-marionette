define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * @param user
         * @param pass
         * @returns {*}
         */
        execute: function(userName, password, firstname, lastname, phone, email, product, minstake, betlimit, pt, vc, currency, balance, accountref){
            var service = ctx.get('apiService');
            return service.createChildAccount(userName, password, firstname, lastname, phone, email, product, minstake, betlimit, pt, vc, currency, balance, accountref);
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Result')){
                var model = ctx.get('agentModel');
                model.addChildAccounts(resp.Result.childAccounts);
            }
        }
    });
});