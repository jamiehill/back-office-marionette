define(['underscore', 'backbone'],
function(_, Backbone) {

    var evaluate = function (template, data) {
        var mapped = [];
        var result = template.replace(/\{([^{}]*)\}/g, function (ignore, key) {
            if (key in data) {
                mapped.push(key);
                return data[key];
            }
            return key;
        });

        _(mapped).each(function (key) {
            delete data[key];
        });

        return result;
    };

    return Backbone.Events.extend({

        methodMap: {
            'POST'  : 'create',
            'PUT'   : 'update',
            'DELETE': 'delete',
            'GET'   : 'read'
        },


        /**
         * @param options
         */
        initialize: function(options){
            this.options = options || {};
            this.targets = this.parseTargets(this.options.targets || {});

            // for each of the target methods, compose a concerete version
            _.each(this.targets, this.createMethod, this);
        },


        /**
         * Carete a target object for each provided target method
         */
        parseTargets: function(targets){
            return _.map(targets, function (val, key) {
                var target = { name: key, path: val, method: "GET", args:[] };

                // if is string, the val should be a method type such as 'POST'
                if (_.isString(val))
                    target.method = val.toUpperCase();

                // if is an array, aasdsumed to be an array of arguments names
                if (_.isArray(val))
                    target.args = val;

                // if is a json object, just extend the target object with new values
                if (_.isObject(val))
                    _.extend(target, val);

                return target;
            });
        },


        createMethod: function (target) {
            var promise, method;

            this[target.name] = function (data, options) {
                promise = new Promise(this);
                options = this.createOptions(promise, target, data, options);
                method = methodMap[target.method];
                Backbone.sync(method, this, options);

                return promise;
            }
        },


        createOptions: function (promise, target, data, options) {
            var self = this;
            var url = _.result(this.options, 'url') + evaluate(target.path, data);

            options || (options = {});

            return _.extend({
                url: url,
                data: data,
                success: function (resp, status, xhr) {
                    options.success && options.success.call(self, resp);
                    promise.resolve(resp);
                },
                error: function (xhr, status, error) {
                    options.error && options.error.apply(self, [error, xhr]);
                    promise.reject(error, xhr);
                }
            }, options);
        }


    });
});