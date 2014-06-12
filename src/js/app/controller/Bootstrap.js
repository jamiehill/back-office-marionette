define(function(require) {
    var Bootstrap = require('common/bootstrap/core/bootstrap');
    return Bootstrap.extend({

        /**
         * Array of Deferrable Boot sequence objects to invoke
         */
        bootSequence: [
            require('common/bootstrap/UrlResolver'),
            require('common/bootstrap/InitCommon')
        ],


        /**
         * Initialize the bootstrap sequence
         * @param options
         */
        initialize:function (options) {
            Bootstrap.prototype.initialize({
                boot: this.bootSequence,
                failOnError: false
            });
        }

    });
});