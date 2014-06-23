define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            id: "",
            label: "",
            nodeid: "",
            sysid: ""
        },


        /**
         * @param data
         * @returns {Market}
         */
        parse : function(data){
            _.each(data, function(val, key){
                if (_.has(this.defaults, key))
                    this.set(key, val);
            }, this);
        }

    },{



    });
});