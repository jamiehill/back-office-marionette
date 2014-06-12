define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            id: null,
            competitorId: null,
            locale: '',
            longName: '',
            shortName: '',
            veryShortName: ''
        }
    },{

        parse : function(data){
            var that = this;
            that.data = data;
            that.translation = new CompetitorTranslation();
            _.each(data, function(val, key){
                if (_.has(that.translation.defaults, key))
                    that.translation.set(key, val);
            });
            return that.translation;
        }

    });
});