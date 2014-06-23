define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            type: '',
            amount: 0,
            selection1: '',
            selection2: '',
            selection3: ''
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