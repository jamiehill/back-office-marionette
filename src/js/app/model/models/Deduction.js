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
        }

    },{

        /**
         * @param data
         * @returns {Market}
         */
        parse : function(data){
            var that = this;
            that.data = data;
            that.deduction = new Deduction();
            _.each(data, function(val, key){
                if (_.has(that.deduction.defaults, key))
                {
//                        if (key === 'fromTime' || key === 'toTime')
//                            val = moment(new Date(val)).format('H:m DD-DM-YY');
                    that.deduction.set(key, val);
                }
            });
            return that.deduction;
        }

    });
});