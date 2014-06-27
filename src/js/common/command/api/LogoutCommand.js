define(['ctx'], function (ctx){
    return function(){
        console.log('Command: command:logout');

        var service = ctx.get('apiService'),
            model = ctx.get('sessionModel');

        service.logout().done(function(resp){
            model.clearSession();
        });
    }
});