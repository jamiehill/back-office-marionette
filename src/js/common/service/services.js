define(function(require) {
    return {
        socket          : require('common/service/SocketService'),
        api             : require('common/service/ApiService'),
        session         : require('common/service/SessionService')
    }
});