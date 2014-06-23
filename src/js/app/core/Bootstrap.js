define(function(require) {
    var Bootstrap = require('common/bootstrap/core/bootstrap');
    return Bootstrap.extend({

        /**
         * Array of Deferrable Boot sequence objects to invoke
         */
        bootSequence: [
            require('common/bootstrap/UrlResolver'),
            require('app/core/ServicesConfig'),
            require('app/core/AppConfig')
        ],


        /**
         * Initialize the bootstrap sequence
         * @param options
         */
        initialize:function (options) {
            this.options = _.extend({}, options, {
                boot: this.bootSequence,
                failOnError: false
            });
            Bootstrap.prototype.initialize(this.options);
        }
    });
});