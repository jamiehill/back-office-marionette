define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({

        /**
         * @param item Either Market or Instrument
         * @param isMarket
         */
        viewBets : function(item, isMarket) {
            $.trigger(this,'onOpenBetsPopup', {
                id : item.id,
                isMarket : isMarket,
                header : item.get('name')
            });
        },


        /**
         * @param item Either Market or Instrument
         * @param isMarket
         */
        setResults: function(item, isMarket){

        },


        /**
         * @param item Either Market or Instrument
         * @param isMarket
         */
        unsetResults: function(item, isMarket){

        },


        /**
         * @param item Either Market or Instrument
         * @param isMarket
         */
        settleByMarket: function(item, isMarket) {
            var marketId = item.id,
                that = this;

            if (isMarket == 'false'){
                that.resettleSelection(item.id, item.get('result'));
                marketId = item.marketId;
            }

            this.resettleMarket(marketId);
        },


        /**
         * @param scope
         * @param id
         */
        unsettleByScope: function(item, isMarket){
            this.apiServer.amendBets(this, this.onUnsettleResult, this.betAmendment({
                unsettle: { id:item.id, scope:isMarket == 'true' ? 'MARKET' : 'SELECTION' }
            }));
        },


        /**
         * @param id
         * @param isMarket
         */
        viewAudit: function(id, isMarket){

        },


        // Active / Displayed handlers


        /**
         * @param value
         * @param isMarket
         * @param id
         */
        setActive: function(model, isMarket){
            // TODO wire up to api
        },


        /**
         * @param value
         * @param isMarket
         * @param id
         */
        setDisplayed: function(model, isMarket){
            // TODO wire up to api
        },


        /**
         * @param id
         * @param isMarket
         */
        resettleMarket: function(marketId){
            this.apiServer.amendBets(this, this.onResettleResult, this.betAmendment({
                resettleMarket: {id: marketId }
            }));
        },


        /**
         * @param id
         * @param isMarket
         */
        resettleSelection: function(selectionId, result){
            this.apiServer.amendBets(this, this.onResettleResult, this.betAmendment({
                amendSelectionResult: {
                    selectionId: selectionId,
                    result: result
                }
            }));
        },


        // Private methods


        /**
         * @param selectionId
         * @param result
         */
        amendSelectionResult: function(selectionId, result){
            this.apiServer.amendBets(this, this.onAmendSelectionResult, this.betAmendment({
                amendSelectionResult: {
                    selectionId: selectionId,
                    result: result
                }
            }));
        },


        /**
         * @param accountId
         * @param betId
         * @param betPartId
         * @param selectionId
         * @param result
         */
        amendBetResult: function(accountId,betId,betPartId,selectionId,result){
            this.apiServer.amendBets(this, this.onAmendBetResult, this.betAmendment({
                amendBetResult: {
                    accountId: accountId,
                    betId: betId,
                    partId: betPartId,
                    selectionId: selectionId,
                    result: result
                }
            }));
        },


        /**
         * @param accountId
         * @param betId
         * @param payout
         */
        amendPayout: function(accountId,betId,payout){
            this.apiServer.amendBets(this, this.onAmendPayoutResult, this.betAmendment({
                amendPayout: {
                    accountId: accountId,
                    betId: betId,
                    payout: payout
                }
            }));
        },


        /**
         * @returns {{BetAmendmentRequest: {userId: *, requestId: string}}}
         */
        betAmendment: function(opts){
            var data = _.extend({}, opts, {
                userId: this.commonModel.getAccountId(),
                requestId: '1'
            })
            return JSON.stringify({BetAmendmentRequest: data});
        },


        onAmendPayoutResult: function(amendBetModel){
            console.log('onAmendBetResult');
        },

        onAmendBetResult: function(amendBetModel){
            console.log('onAmendBetResult');
        },

        onAmendSelectionResult: function( betAmendmentModel ){
            console.log('Selection amendment result');
        },

        onUnsettleResult: function( betAmendmentModel ){
            console.log('Selection amendment result');
        },

        onResettleResult: function( betAmendmentModel ){
            console.log('Resettle market result found');
        }

    });
});
