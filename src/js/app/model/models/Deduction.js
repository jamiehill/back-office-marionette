define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            type: '',
            amount: 0,
            fromTime: null,
            toTime: null,
            confirmed: '',
            added: 'false'
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