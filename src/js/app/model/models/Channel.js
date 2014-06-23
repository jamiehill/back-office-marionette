define(['backbone', 'app/model/models/Instrument'],
function (Backbone, Instrument) {
    return Backbone.Model.extend({

        id: "INTERNET", // default - non INTERNET channels should explicitly override this
        Instruments: null,
        eventId: "",
        marketId: "",


        /**
         * @param a
         * @param b
         * @returns {boolean}
         */
        comparator: function(a, b) {
            return App.util.sort.sortOn(a, b, 'displayOrder');
        },


        /**
         * @param instrs
         */
        addInstrument: function(instr){
            if (this.Instruments === null)
                this.Instruments = new (Backbone.Collection.extend({model:Instrument}))();
            this.Instruments.add(instr);
        },


        /**
         * Returns the Instrument with the specified id
         * @param type
         */
        getInstrument: function(id){
            var instr = this.Instruments.findWhere({id:id});
            return instr;
        },


        /**
         * @param instrs
         */
        update2: function(data){
            var that = this;
            _.each(data.selection, function(i){
                var instr = that.Instruments.get(i.id);
                if (instr !== undefined)
                    instr.update(i)
            });
        },


        /**
         *
         */
        parse: function(data){
            _.each(data.selection, function(s){
                this.addInstrument(new Instrument(s));
            }, this);
            return channel;
        }


    },{



    });
});