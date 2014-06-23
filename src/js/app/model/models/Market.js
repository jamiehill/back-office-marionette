define([
    'backbone',
    'app/model/models/Instrument',
    'app/model/models/LinkedMarket',
    'app/model/models/Channel',
    'app/model/models/Deduction',
    'app/model/models/Dividend',
    'common/util/CollectionUtil'
    ],
function (Backbone, Instrument, LinkedMarket, Channel, Deduction, Dividend, collection) {
    return Backbone.Model.extend({

        LinkedMarkets: null,
        Channels: null,
        Deductions: null,
        Dividends: null,
        eventId: "",
        adjustments: {},


        defaults: {
            id: '',
            name: '',
            type: 'WEW',
            state: 'SUSPENDED',
            visible: 'true',
            published: 'true',
            bir: "true",
            sysRef: '',
            displayOrder: 0,
            eachwayPlaces: 0,
            settled: 'false',
            resultConfirmed: 'false',
            resultingStatus: 'NOT_SET',
            doubleResulting: "false",
            isTricastAvail: "true",
            isEachWayAvail: "true",
            deduction: "1/5",
            displayIn: "remote,retail",
            isForecastAvail: "true",
            isSPAvail: "true",
            early: "false",
            detail: "full"
        },


        /**
         * @param event
         * @param evt
         */
        update : function(mkt){
            this.set('visible', mkt.displayed);
            this.set('state', mkt.state);
            var that = this;
            _.each(mkt.channel, function(chn){
                var channel = that.Channels.get(chn.channel);
                if (channel === undefined)
                    that.Channels.add(Channel.parse(chn));
                else channel.update2(chn);
            });
        },


        /**
         * Retrieve a channel froom the Channels collection.
         * @param name Channel name - if none speified uses default 'INTERNET'
         */
        getChannel: function(name){
            name = name || 'INTERNET';
            return this.Channels.get(name);
        },


        /**
         * Retrieve an array of all available channels for this market
         */
        availableChannels: function(){
            return _.map(this.Channels.models, function(m){
                return m.id;
            });
        },


        /**
         * Returns the Dividends object by type (forecast/tricast)
         * @param type
         */
        getDividend: function(type){
        	if (this.Dividends) {
        		return this.Dividends.findWhere({type:type});
        	}
            return 0;
        },


        /**
         * Returns the Instrument with the specified id
         * @param type
         */
        getInstrument: function(id, channel){
            var channel = this.getChannel(channel || '');
            return channel.getInstrument(id);
        },


        /**
         * @param data
         * @returns {Market}
         */
        parse : function(data, eventId){
            var that = this;
            that.data = data;
            this.set('eventId', eventId);

            _.each(data, function(val, key){
                if (_.has(that.market.defaults, key))
                    that.set(key, val);
            });

            // Ain't no channels at this point, so create a dummy default one in next step!
            if (_.has(data, 'Channels'))
                that.Channels = Market.parseChannels(data.Channels);

            // temporary hack to get this market's Instruments into a default Channel,
            // as as yet, no channels exist, and will not until they're
            // populated via the streaming updates.
            else if (_.has(data, 'Instruments'))
            {
                that.channel = new Channel();
                this.channel.eventId = eventId;
                this.channel.marketId = that.id;
                _.each(data.Instruments, function(s){
                    that.channel.addInstrument(new Instrument(s, eventId, that.id));
                });
                that.Channels = collection.factory(Channel, that.channel);
            }

            if (_.has(data, 'Deductions'))
                that.Deductions = Market.parseDeductions(data.Deductions);

            if (_.has(data, 'Dividends'))
                that.Dividends = Market.parseDividends(data.Dividends);

            if (_.has(data, 'LinkedMarkets'))
                that.LinkedMarkets = Market.parseLinkedMarket(data.LinkedMarkets);

            return that.market;
        },


    },{

        /**
         *
         */
        parseLinkedMarket: function(mkts){
            var markets = _.map(mkts, function(m){
                return LinkedMarket.parse(m);
            });
            return App.util.collection.factory(LinkedMarket, markets);
        },


        /**
         *
         */
        parseChannels: function(chls){
            var channels = _.map(chls, function(c){
                return Channel.parse(c);
            });
            return App.util.collection.factory(Channel, channels);
        },


        /**
         *
         */
        parseDeductions: function(dct){
            var deductions = _.map(dct, function(d){
                return Deduction.parse(d);
            });
            return App.util.collection.factory(Deduction, deductions);
        },

        /**
         *
         */
        parseDividends: function(divs){
            var dividends = _.map(divs, function(d){
                return Dividend.parse(d);
            });
            return App.util.collection.factory(Dividend, dividends);
        }

    });
});