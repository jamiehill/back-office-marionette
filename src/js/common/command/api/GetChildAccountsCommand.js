define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * @param user
         * @param pass
         * @returns {*}
         */
        execute: function(user, pass){
            var service = ctx.get('apiService'),
                model = ctx.get('sessionModel');
            return service.getChildAccounts(model.get('accountId'));
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