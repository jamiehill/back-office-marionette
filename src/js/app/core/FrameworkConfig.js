define(['marionette', 'backbone.wreqr', 'backbone.command', 'common/bootstrap/core/DeferredBase'],
function (Marionette, Wreqr, Command, DeferredBase) {


    /**
     * Overrides the WReqR Command execute method to return Promises
     * @param name
     * @param args
     * @returns {*}
     */
    Wreqr.Commands.prototype.execute = function(name, args) {
        name = arguments[0];
        args = Array.prototype.slice.call(arguments, 1);
        if (this.hasHandler(name)) {
            var callback = this._wreqrHandlers[name].callback,
                command  = callback.prototype;
                command.name = name;

            var promise = command._execute.apply(command, args);
            if (!_.isUndefined(promise)) {
                return promise.then(function(resp){
                    var action = _.has(resp, 'Error') ?
                        '_error' : '_success';
                    Command.prototype[action].apply(command, arguments);

                },function(er){
//                    command.prototype._error(arguments);
                    Command.prototype._error.apply(command, arguments);
                });
            }
        } else {
            this.storage.addCommand(name, args);
        }
    };

    return DeferredBase.extend({
        name: 'FrameworkConfig',
        init: function() {
            this.success();
        }
    })
});
