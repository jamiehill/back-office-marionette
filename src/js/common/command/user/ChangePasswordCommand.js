/**
 * Created by Jamie on 03/10/2014.
 */
define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * @param user
         * @param pass
         * @returns {*}
         */
        execute: function(oldPass, newPass, userid){
//            var service = ctx.get('apiService');
//            return service.changePassword(oldPass, newPass, userid);
        },


        /**
         * @param resp
         */
        success: function(resp) {
            if (_.has(resp, 'Login')){

            }
        },


        /**
         *
         * @param resp
         */
        error: function(resp) {
            if (_.has(resp, 'Error')){

            }
        },


    });
});