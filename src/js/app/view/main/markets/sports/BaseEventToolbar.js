define([
    'backbone', 'moment',
    'app/view/main/markets/sports/BaseToolbar',
    'text!app/view/main/markets/sports/templates/ActiveDisplayed.tpl.html',
    'text!app/view/main/markets/sports/templates/IconText.tpl.html',
    'text!app/view/main/markets/sports/templates/FilterInput.tpl.html'
],

function (Backbone, moment, BaseToolbar, adTpl, tdTpl, iiTpl) {
    return BaseToolbar.extend({


        /**
         * Renders the base toolbar
         */
        onShow: function(){
            var scope = this,
                eventName = this.model.get('name'),
                eventTime = this.getTime();
            this.toolBar = $(this.el).w2toolbar({
                name: uid.getUid(),
                items: this.items(scope, eventName, eventTime.time, eventTime.date),
                style: "padding: 4px 6px 4px 6px",
                onClick: function(e){
                    scope.trigger(e.target+'Click');
                }
            });

            this.addBinding($(this.el), 'expandedChange', this.toggle);
            return this;
        },


        /**
         * Humanize event time
         * @returns {*}
         */
        getTime: function() {
            var time = this.model.get('eventTime');
            return {
                time : moment(time).format('HH:mm'),
                date : moment(time).format('DD MMM YYYY')
            };
        },


        /**
         * Items settings for tool bar
         */
        items: function(scope, name, time, date){
            var active = (this.model.get('state') == 'ACTIVE') ? "on" : "",
                disp = (this.model.get('displayed')) ? "on" : "";
            return [
                {type: 'button',  id: 'toggleButton', img: 'fa fa-minus-square fa-fw', style: 'color:#68718a'},
                {type: 'break'},
                {type: 'html', id: 'eventName', html: '<h5> '+name+'</h5>'},
                {type: 'break'},
                {type: 'html', id: 'actDisp', html: _.template(adTpl, {active:active, displayed:disp})},
                {type: 'break'},
                {type: 'html', id: 'eventTime', html: _.template(tdTpl, {icon:'fa-clock-o', text:time})},
                {type: 'break'},
                {type: 'html', id: 'eventDate', html: _.template(tdTpl, {icon:'fa-calendar', text:date})},
                {type: 'spacer'},
                {type: 'check',  id: 'inplay', caption: '', img: 'fa fa-flag fa-fw', checked: false, hint: 'Is the Event currently Inplay?' },
                {type: 'check',  id: 'willGoInplay', caption: '', img: 'fa fa-flag-checkered fa-fw',checked: false, hint: 'Can the Event go Inplay?' },
                {type: 'break'},
                {type: 'menu', id: 'channel', caption: 'Channel', items: scope.channels(scope)},
                {type: 'break'},
                {type: 'html',  id: 'filter', html: _.template(iiTpl, {tooltip:'Filter Markets for '+this.model.get('name')})},
                {type: 'break'}
//                {type: 'button',  id: 'columns',  img: 'fa fa-columns fa-fw'},
            ];
        },





        /**
         * Returns all unique channel for this model
         * @param scope
         * @returns {Array}
         */
        channels: function(scope){
            var arr = [];
            _.each(scope.model.availableChannels(), function(c){
                arr.push({text:string.properCase(c), id:c});
            });
            return arr;
        },


        /**
         * @param val
         * @param icon
         * @returns {string}
         */
        toolbarItem: function(val, icon){
            return "<h5 class='fa "+icon+" fa-fw' style='color: #68718a'> "+val+"</h5>";
        }
    });
});
