define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            id: 0,
            name: '',
            code: '',
            imagePath: ''
        }
    },{

        /**
         * @param data
         * @returns {Locale}
         */
        parse : function(data){
            var that = this;
            that.data = data;
            that.locale = new Locale();
            _.each(data, function(val, key){
                if (_.has(that.locale.defaults, key))
                    that.locale.set(key, val);
            });
            return that.locale;
        }

    });
});