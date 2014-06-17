define([
        'marionette', 'moment',

        'text!app/view/aside/simple/SimpleSearchView.tpl.html',
        'text!app/view/aside/simple/SearchInput.tpl.html'
    ],

    function (Marionette, moment, tpl, filterTpl) {
    return Marionette.View.extend({


        id: 'simpleWrapper',
        events: {
            "keyup .searchInput": "onSearch"
        },


        /**
         *
         */
        onShow: function(){
            _.bindAll(this, 'onSearch');

            var template = _.template(tpl, {});
            this.$el.html(template);

            this.initToolbar();
            this.initGrid();
            this.delegateEvents();
        },


        /**
         * Build main grid
         */
        initToolbar: function(){
            var scope = this,
                element = $(this.el).find('#simpleToolbar');

            if (w2ui.simpleToolbar)
                element.w2render(w2ui.simpleToolbar);
            else {
                $(element).w2toolbar({
                    name: 'simpleToolbar',
                    items: scope.items(scope),
                    style: "padding: 7px 6px 7px 6px"
                });
            }
        },



        /**
         * Build main grid
         */
        initGrid: function(){
            var element = $(this.el).find('#simpleResults')
            if (w2ui.simpleSearchResults)
                element.w2render(w2ui.simpleSearchResults);
            else {

                var options = this.defaultOptions();
                options.columns = this.defaultColumns(this);
                options.onSearch = this.onSearch;
                options.onSelect = this.onSelect;
                options.onUnselect = this.onUnselect;

                $(element).w2grid(options);
            }
        },


        /**
         * @param e
         */
        onSearch: function(e){
            if (e.keyCode != 13) return;
            if (_.isEmpty(e.target.value)) return;

            w2ui['simpleSearchResults'].clear();
            w2ui['simpleSearchResults'].lock('Searching...');

            var service = App.core.services.api.eventSearch,
                expired = w2ui['simpleToolbar'].get('past').checked,
                scope = this;

            service(e.target.value, expired).done(function(resp){
                scope.onSearchResults(resp, scope);
            });
        },


        /**
         * @param model
         */
        onSearchResults: function(resp, scope){
            var resultEvents = resp.Result.nodes,
                events = [];

            for (var i in resultEvents) {
                var event = resultEvents[i];
                events.push({
                    recid : 'n-' + event.id,
                    eventName : event.name,
                    sport : event.sportsCode,
                    date : moment(event.eventTime).format('DD-MM-YY'),
                    event : event
                });
            }

            w2ui['simpleSearchResults'].add(events);
            w2ui['simpleSearchResults'].unlock();
        },


        /**
         * @param e
         * @param scope
         */
        onSelect: function(e){
            var event = w2ui['simpleSearchResults'].get(e.recid).event;
            App.core.vent.trigger('search:eventselected', event);
        },


        /**
         * @param e
         * @param scope
         */
        onUnselect: function(e){
            var event = w2ui['simpleSearchResults'].get(e.recid).event;
            App.core.vent.trigger('search:eventunselected', event);
        },


        /**
         * Defaults grid options - applies to both main/sub grids
         * @param name
         */
        defaultOptions: function(scope){
            return {
                name: 'simpleSearchResults',
                fixedBody: true,
                show: {
                    toolbar: false,
                    selectColumn: true
                },
                multiSearch: false,
                searches: [
                    { field: 'eventName', caption: 'Event Name' }
                ]
            }
        },


        /**
         * @returns {*[]}
         */
        defaultColumns: function(scope){
            return [
                //{ field: 'eventId', caption: 'Event Id', hidden: true },
                { field: 'eventName', caption: 'Name', size: '100%', sortable: true },
                { field: 'date', caption: 'Date', size: '60px', style: 'text-align: center', sortable: true },
                { field: 'sport', caption: 'Sport', size: '100px', style: 'text-align: center', sortable: true }
            ]
        },


        /**
         * Items settings for tool bar
         */
        items: function(scope){
            return [
                {type: 'html',  id: 'filter', html: _.template(filterTpl, {icon: '', tooltip:'Search for Events'})},
                {type: 'spacer'},
//                {type: 'break'},
                {type: 'check',  id: 'past', caption: '', img: 'fa fa-history fa-fw', checked: false, hint: 'Include all past Events in search' },
                {type: 'button',  id: 'columns', caption: '', img: 'fa fa-columns fa-fw', checked: false, hint: 'Include all past Events in search' }
            ];
        }
    });
});
