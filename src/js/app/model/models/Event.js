define(['backbone', 'app/model/models/Market', 'app/model/models/Event'],
function (Backbone, Market, Event) {
    return Backbone.Model.extend({

        LinkedFromNodes: null,
        Markets: null,
        Nodes: null,

        defaults: {
            id: "na",
            name: "na",
            active: 'false',
            displayed: 'false',
            managed: 'true',
            level: 0,
            type: 'TRADING',
            state: 'ACTIVE',
            sysRef: '',
            eventTime: '',
            startTime: '',
            closeTime: '',
            path: '',
            parentId: '',
            numChildMarkets: 0,
            numChildNodes: 0,
            raceClass: "na",
            countryCode: '',
            raceNumber: "na",
            handicap: "true",
            marketAreaId: '',
            marketAreaCode: '',
            detail: 'full',
            recid: "na",
            sport: "na",
            templateId: '',
            trackType: ''
        },


        initialize: function(){
//            $.subscribe('InstrumentUpdate', this, this.onInstrumentUpdate);
        },



        /**
         * Update the model with full Event details once loaded
         * @param data
         */
        populate: function(data){
            var scope = this;
            scope.data = data;
            _.each(data, function(val, key){
                if (_.has(scope.defaults, key))
                    scope.set(key, val);
            });

//            if (_.has(data, 'LinkedFromNodes'))
//                scope.LinkedFromNodes = Event.parseLinkedFromNodes(data.LinkedFromNodes);
            if (_.has(data, 'Markets'))
                scope.Markets = Event.parseMarkets(data.Markets, this.id);

            console.log(data);
        },


        /**
         * @param event
         * @param evt
         */
        update : function(event){
            if (event.eventTradingState === undefined) return;

            var that = this;
            this.set('active', event.eventTradingState.state == 'ACTIVE');
            this.set('state', event.eventTradingState.state);
            _.each(event.eventTradingState.prices.market, function(mkt){
                var market = that.Markets.get(mkt.id);
                if (market !== undefined)
                    market.update(mkt);
            });
            this.trigger('change');
        },


        /**
         * Retrieve an array of all available channels for this Event
         */
        availableChannels: function(){
            var channelNames = [];
            _.each(this.Markets.models, function(m){
                channelNames = _.union(channelNames, m.availableChannels())
            });
            return _.uniq(channelNames);
        },


        /**
         * @param id
         * @returns {*}
         */
        findMarket: function(id){
            return this.Markets.findWhere({id:id});
        },


        /**
         * Returns the instrument with the specified id
         * @param id
         * @returns {*}
         */
        findInstr: function(id){
            var mkt = this.findMarketForInstr(id);
            return mkt.getInstrument(id);
        },


        /**
         * Returns the parent market for the specified Instrument
         * @param id
         * @returns {*}
         */
        findMarketForInstr: function(id){
            return _.find(this.Markets.models, function(m){
                var instr = m.getInstrument(id);
                return (instr !== undefined);
            })
        },


        /**
         * @param e
         */
        onInstrumentUpdate: function(e){
            if (e.data.eventId === this.get('id'))
                this.trigger('change', this);
        },


        /**
         * TODO: Incorporate into one Event instance when data initially loaded
         */
        parse : function(data){
            this.set('id', data.id);
            this.set('name', data.name);
            this.set('eventTime', new Date(data.eventTime));
            this.set('recid', '');
            this.set('sport', data.sportsCode);
            this.set('data', data);
        }


    },{

        /**
         *
         */
        parseMarkets: function(mkts, eventId){
            var markets = _.map(mkts, function(m){
                return new Market(m, eventId);
            });
            return App.util.collection.factory(Market, markets);
        },


        /**
         *
         */
        parseLinkedFromNodes: function(nds){
            var nodes = _.map(nds, function(n){
                return new LinkedFromNodes(n);
            });
            return App.util.collection.factory(LinkedFromNodes, nodes);
        }

    });
});