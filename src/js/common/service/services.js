define(function(require) {
    return {
//        socket          : new (require('common/service/SocketService'))(),
        api             : new (require('common/service/ApiService'))()
//        session         : new (require('common/service/SessionService'))()
    }
});