define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * @param user
         * @param pass
         * @returns {*}
         */
        execute: function(id){
            var service = ctx.get('apiService');
            return service.checkAccountAvailability(id);
        }
    });
});