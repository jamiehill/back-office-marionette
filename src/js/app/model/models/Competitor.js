define(['backbone','app/model/models/CompetitorTranslation'],
function (Backbone, CompetitorTranslation) {
    return Backbone.Model.extend({

        translations: null,

        defaults: {
            id: '',
            name: '',
            competitions: null,
        },

        getTranslation: function(locale){
        	var translation = null;
        	if (this.translations) {
        		translation = this.translations.findWhere({locale:locale});
        	}
        	if (!translation) {
        		translation = {attributes : {longName : '', shortName : '', veryShortName : ''}};
        	}
            return translation;
        },
        
        updateTranslation: function(translation) {
        	this.translations.remove(this.translations.get(translation.id));

        	var newTranslation = CompetitorTranslation.parse(translation);
        	this.translations.add(newTranslation);
        }

    },{

        parse : function(data){
            var that = this;
            that.data = data;
            that.competitor = new Competitor();

            _.each(data, function(val, key){
                if (_.has(that.competitor.defaults, key))
                    that.competitor.set(key, val);
            });
            
            that.competitor.translations = Competitor.parseTranslations(data.translations);

            return that.competitor;
        },
        
        
        parseTranslations: function(translations){
            var translations2 = _.map(translations, function(t){
                return CompetitorTranslation.parse(t);
            });
            return App.util.collection.factory(CompetitorTranslation, translations2);
        }

    });
});