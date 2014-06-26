define(['ctx'], function (ctx){
    return function(username, password){
        console.log('Command: command:logout');

        var service = ctx.get('apiService');
        service.login(username, password);
    }
});