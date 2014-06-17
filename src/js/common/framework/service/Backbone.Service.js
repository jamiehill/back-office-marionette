define(['underscore', 'backbone'],
function(_, Backbone) {
    return Backbone.Model.extend({

        methodMap: {
            'POST'      : 'create',
            'PUT'       : 'update',
            'DELETE'    : 'delete',
            'GETJSON'   : 'read',
            'GET'       : 'read'
        },

        headerMap: {
            'GETJSON'   : { 'Accept': 'text/x-json' }
        },


        /**
         * Targets object should be either array or object
         * The key value should always represent the remote method
         * name to invoke.  The value can have several different properties.
         * If it's a String, it should represent the method type.  If it's an
         * array, it should be an array of expected arguments.  if it's an
         * object, it can contain any of the following,
         *
         * 'method' - String representing the method type ie. 'POST' (not case sensitive),
         * 'args' - Array of strings/objects representing expected arguments to pass to method call.
         * if the item is an object, it should represent the argument name, and default value for this
         * argument.  The value should be a string.  But if the string matches a 'defaults' attribute
         * value, it will use that to query the value on each invocation.  this is especially
         * usefully for seemlessly retrieving dynamic values, such as a sessionToken.
         * exmaple:
         *
         * Method type will always default to a 'GET' unless specified.
         *
         * defaults: {
         *  sessionToken: function(){
         *      return this.sessionModel.getSessionToken();
         *  }
         * }
         *
         * targets: {
         *  "someRemoteMethod": "POST",
         *  "login": [ "username":"password" ],
         *  "getEvents": { method:"get", args:[ 'nodeId', 'sport' ] },
         *
         *  // here 'sessionToken' matches an attribute, so that method will be invoked each time required.
         *  "getEvent": { args:[ 'nodeId', {sport:'football, sessionToken:'sessionToken'}] }
         * }
         */


        /**
         * @param options
         */
        initialize: function(options){
            this.url = options.url;
            this.targetsObjs = this.parseTargets(this.targets || {});
            _.bindAll(this, 'createMethod');
            _.each(this.targetsObjs, this.createMethod, this);
        },


        /**
         * Crete a target object for each provided target method
         */
        parseTargets: function(targets){
            return _.map(targets, function (options, request) {
                var target = { request: request, method: "get", args:[] };

                // if is string, the options should be a method type such as 'POST'
                if (_.isString(options))
                    target.method = options.toUpperCase();

                // if is an array, assumed to be an array of arguments names/objects
                if (_.isArray(options))
                    target.args = options;

                // if is a json object, just extend the target object with new values
                if (_.isObject(options))
                    _.extend(target, options);

                target.method = target.method.toUpperCase();
                return target;
            });
        },


        /**
         * Create the actual targets' method on this service.
         *
         * Calling the method returns a JQuery Promise object.  This provides a subset
         * of the callback methods of the Deferred object (then, done, fail, always,
         * pipe, and state).  This enables multiple ways of responding to a promises
         * response.
         *
         * For example:
         *
         *  var promise = this.api.login('jamie', 'password');
         *
         *  promise.done(function(resp){
         *      // do something with the success response
         *  });
         *
         *  promise.fail(function(resp){
         *      // do something with the failure response
         *  });
         *
         *  promise.always(function(resp){
         *      // always do something regardless of outcome
         *  });
         *
         * You can also use the 'ten' shorthand for adding the previous callbacks in one go:
         *
         *  promise.then(doneCallback, failCallback, alwaysCallback);
         *
         * @param target
         */
        createMethod: function (target) {
            var scope = this;
            this[target.request] = function () {
                var deferred     = $.Deferred(),
                    options      = scope.createOptions(target, arguments, deferred),
                    method       = scope.methodMap[target.method];
                Backbone.sync(method, scope, options);
                return deferred.promise(scope);
            }
        },


        /**
         * A pretty ugly method!
         *
         * @param target
         * @param data
         * @param deferred
         * @returns {{url: string, data: *, success: success, error: error}}
         */
        createOptions: function(target, data, deferred){
            return this.addHeaders({
                url     : this.url.replace(/\/$/, "") + '/' + target.request,
                data    : this.getParams(target, data),
                success : function (resp, status, xhr) {
                    deferred.resolve(resp);
                },
                error   : function (xhr, status, error) {
                   deferred.reject(error, xhr);
                }
            });
        },


        /**
         * Returns a resolved params object, with all required parameters added
         * @param args
         * @param data
         */
        getParams: function(target, data){
            var params = {}, nonRequired = 0, that = this;
            _.each(target.args, function(arg, index){
                if (_.isString(arg)){
                    params[arg] = data[index];
                }
                else if (_.isObject(arg)) {
                    var pairs = _.pairs(arg);
                    _.each(pairs, function(element, i){
                        if (_.has(that.attributes, element[0])) {
                            params[element[0]] = that.get(element[1]);
                        }
                        else {
                            if (_.isUndefined(element[1])) nonRequired ++;
                            else params[element[0]] = data[index];
                        }
                    });
                }
            });

            // if the number of configured args does not match the number required, throw error
            if (_.size(params) != target.args.length - nonRequired)
                throw new Error("ServiceMethodInvocationException :: the method: '"+target.name+"' expected "+
                    target.args.length+" arguments - "+target.args.toString()+", but received "+arguments.length);

            return $.param(params);
        },

        /**
         * Extends the target options to include any default headers for the request method type
         * @param options
         * @param method
         * @returns {*}
         */
        addHeaders: function(options, method){
            var headers = this.headerMap[method];
            if (headers)
                _.extend(options, { headers: headers });
            return options;
        },


        /**
         * Extends the backbone 'get' method to return invoked function calls for model attributes:
         *
         * defaults: {
         *  robotSays: function(){
         *      return "Beep Beep";
         *  }
         * }
         *
         * this.get('robotSays') >  'Beep Beep'
         *
         * @param attr
         * @returns {*}
         */
        get: function(attr) {
            var value = Backbone.Model.prototype.get.call(this, attr);
            return _.isFunction(value) ? value.call(this) : value;
        }
    });
});