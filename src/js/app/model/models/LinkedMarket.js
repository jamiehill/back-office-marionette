define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            id: "",
            label: "",
            nodeid: "",
            sysid: ""
        }

    },{

        /**
         * @param data
         * @returns {Market}
         */
        parse : function(data){
            var that = this;
            that.data = data;
            that.lm = new LinkedMarket();
            _.each(data, function(val, key){
                if (_.has(that.lm.defaults, key))
                    that.lm.set(key, val);
            });
            return that.lm;
        }

    });
});