define(['marionette', 'backbone.wreqr', 'common/bootstrap/core/DeferredBase'],
function (Marionette, Wreqr, DeferredBase) {


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
                    var result = _.has(resp, 'Error') ?
                        '_error' : '_success';
                    command[result].apply(command, [resp]);
                },function(er){ command._error.apply(command, [er]); });
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
