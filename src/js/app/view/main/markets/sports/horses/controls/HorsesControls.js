define(function (require) {

    var Marionette = require('marionette'),
        tpl = require('text!app/view/main/markets/sports/horses/controls/HorsesControls.tpl.html');

    return Marionette.View.extend({


        ui: {
            "close": "#close", // close event button
            "add": "#addIcon"  // add rule 4 button
        },

        events: {
            "click @ui.close": "closeEvent",
            "click @ui.add": "addRule4"
        },


        /**
         *
         */
        initialize: function(){
            this.wew = this.model.Markets.findWhere({type: 'WEW'});
            this.listenTo(this.model, 'change', this.render);
        },


        /**
         * Renders onShow
         */
        onShow: function(){
            this.render();
            this.initControls();
        },


        /**
         * Renders the controls bar
         */
        render: function(){
            var template = _.template(tpl, this.getOptions());
            this.$el.html(template);
        },


        initControls: function(){
            this.termsDeduction = this.$el.find('#termsDeduction');
        },


        /**
         * Returns the template options
         */
        getOptions: function(){
            var fcDividend = this.wew.getDividend('FC'),
                tcDividend = this.wew.getDividend('TC');

            var options = {
                deduction: this.wew.get('deduction') || 0,
                runners: this.wew.getChannel().Instruments.models,
                forecast: {
                    title: this.wew.get('isForecastAvail') ? 'Available' : 'Unavailable',
                    class: this.wew.get('isForecastAvail') ? '' : 'on',
                    first: fcDividend ? this.wew.getInstrument(fcDividend.get('selection1')) : "",
                    second: fcDividend ? this.wew.getInstrument(fcDividend.get('selection2')) : "",
                    amount: fcDividend ? fcDividend.get('amount') : 0
                },
                tricast: {
                    title: this.wew.get('isTricastAvail') ? 'Available' : 'Unavailable',
                    class: this.wew.get('isTricastAvail') ? '' : 'on',
                    first: tcDividend ? this.wew.getInstrument(tcDividend.get('selection1')) : '',
                    second: tcDividend ? this.wew.getInstrument(tcDividend.get('selection2')) : '',
                    third: tcDividend ? this.wew.getInstrument(tcDividend.get('selection3')) : '',
                    amount: tcDividend ? tcDividend.get('amount') : 0
                },
                eachway: {
                    title: this.wew.get('isEachWayAvail') ? 'Available' : 'Unavailable',
                    class: this.wew.get('isEachWayAvail') ? '' : 'on',
                    places: this.wew.get('eachwayPlaces')
                },
                deductions: this.wew.Deductions ? this.wew.Deductions.models : []
            }
            console.log(options);
            return options;
        },


        // Handlers


        /**
         * @param e
         */
        closeEvent: function(e){
            if (e) e.stopImmediatePropagation();
            $.publish(this, 'boEventSearch_eventUnselected', this.model);
        },


        /**
         * @param e
         */
        addRule4: function(e){
            if (e) e.stopImmediatePropagation();
            var deduction = new Deduction();
            deduction.added = 'true';
            this.wew.Deductions.add(deduction);
            this.render();
        }


    });

});
