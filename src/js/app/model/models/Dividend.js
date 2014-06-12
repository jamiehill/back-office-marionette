define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            type: '',
            amount: 0,
            selection1: '',
            selection2: '',
            selection3: ''
        }
    },{

        /**
         * @param data
         * @returns {Market}
         */
        parse : function(data){
            var that = this;
            that.data = data;
            that.dividend = new Dividend();
            _.each(data, function(val, key){
                if (_.has(that.dividend.defaults, key))
                    that.dividend.set(key, val);
            });
            return that.dividend;
        }

    });
});