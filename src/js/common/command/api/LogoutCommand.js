define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({
        execute: function(){
            ctx.get('sessionModel').clearSession();
            return ctx.get('apiService').logout();
        }
    });
});