define(['common/framework/command/Backbone.Command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * @param user
         * @param pass
         * @returns {*}
         */
        execute: function(user, pass){
            console.log('Command: command:login');
            var service = ctx.get('apiService'),
                promise = service.login(user, pass);
            return promise.then(this.success, this.failure);
        },


        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Error'))
                this.loginFailure(resp);

            else if (_.has(resp, 'Login')){
                ctx.get('sessionModel').storeSession(resp.Login);
            }
        }
    });
});