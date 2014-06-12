define(function(require) {
    var DeferredBase = require('common/bootstrap/core/DeferredBase')

    return DeferredBase.extend({
        name: 'UrlResolver',

        /**
         * Override to add defered functionality.  This DummyDeferred, simply
         * chooses a random 'success' or 'failure' outcome, and invokes after 2 seconds
         */
        init: function(){
            App.url = window.location.host;
            console.log('Bootstrap: '+this.name+' - url: '+App.url);
            this.success();
        }
    });
});