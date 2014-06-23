define(['backbone', 'moment'],
function (Backbone, moment) {
    return Backbone.Model.extend({

        eventId: "",
        marketId: "",
        adjustments:{},


        defaults: {
            id: '',
            name: '',
            displayOrder: '',
            position: '',
            sysRef: '',
            fbResult: "",
            settled: 'false',
            result: '-',
            place: '-',
            resultConfirmed: 'false',
            state: 'SUSPENDED',
            displayed: 'false',
            startingPrice: '-',
            decimalOdds: '-',
            fractionalOdds: '-',

            lpDeductionAmount: '-',
            lpDeductionTime: '-',
            spDeductionAmount: '-',
            spDeductionTime: '-',

            stake: '0',
            liab: '0',
            bets: '0',
            profitLoss: '0'
        },


        /**
         * Update the model with full Event details once loaded
         * @param data
         */
        update: function(data){
            var that = this;
            that.data = data;
            _.each(data, function(val, key){
                if (_.has(that.defaults, key))
                    that.set(key, val);
            });

            console.log('Instrument::update '+this.toJSON());
            $.trigger("InstrumentUpdate", {eventId:this.eventId});
        },


        /**
         * Stores an adjusted value, for the purpose
         * of reseting/saving at a later time
         */
        addAdjustment: function(target, name, value){
            if (this.adjustments == undefined)
                this.adjustments = {};
            this.adjustments[name] = {
                name: name,
                value: value,
                target: target
            };
            this.set(name, value);
        },


        /**
         * @param data
         * @returns {Market}
         */
        parse : function(data, eventId, marketId){
            this.set('eventId', eventId);
            this.set('marketId', marketId);

            _.each(data, function(val, key){
                if (_.has(this.defaults, key))
                    if (key === 'lpDeductionTime' || key === 'spDeductionTime')
                        val = moment(new Date(val)).format('H:m DD-DM-YY');
                this.set(key, val);
            }, this);
        }

    },{



    });
});