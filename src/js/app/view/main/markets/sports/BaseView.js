define([
        'marionette',

        'app/view/main/markets/sports/BaseViewPM',
        'app/view/main/components/menu/OptionsMenu',

        'text!app/view/main/markets/sports/templates/ActiveDisplayed.tpl.html',
        'text!app/view/main/markets/sports/templates/ItemName.tpl.html',
        'text!app/view/main/markets/sports/templates/ResultSelector.tpl.html'
    ],

    function (Marionette, uid, gridFilter, commons, BaseViewPM, OptionsMenu, itemIcons, itemName, resultSelector) {
        'use strict';

        var BaseView = Marionette.View.extend({


            miniColumn: '60px',
            smColumn: '80px',
            mdColumn: '120px',
            lgColumn: '200px',


            events: {
                "click .optionsMenu": "onOpenOptions",
                "change .results": "onResultSelected",
                "click #active": function(e){
                    this.pm.setActive(this.model, true);
                },
                "click #display": function(e){
                    this.pm.setDisplayed(this.model, true);
                }
            },


            /**
             *
             */
            initialize: function(){
                this.pm = new BaseViewPM({model:this.model, el:this.el});
                this.listenTo(this.model, 'change add remove', this.refresh);
            },


            /**
             * @param data
             */
            filter: function(data){
//                var name = '#grid_'+this.gridId+'_records',
//                    rows = $(this.$el).find(name+' > table > tbody > tr');
//                gridFilter.onName(rows, data.filter);


                w2ui[this.gridId].search('name', data.filter);
//                $(data.target).trigger('focus').select();

//                $(data.target).focus();
//                $(data.target).val('hello');

                var input = $(data.target);
//                setTimeout(function(){
                    input.focus();
                    var tmpStr = input.val();
                    input.val('');
                    input.val(tmpStr);

//                }, 3000);


            },


            /**
             * Once the dom element has been created, build the view
             */
            onShow: function(){
                this.initOptionsMenu();
                this.initGrid();
            },


            /**
             * Build main grid
             */
            initGrid: function(){
                var scope = this;
                this.gridId = uid.getUid();

                var options = this.defaultOptions(this.gridId, true);
                options.columns = this.defaultColumns(scope, 350, true);
                options.records = this.parseRecords(this.model.Markets.models);
                options.onExpand = function (event) {
                    scope.onExpandRow(event, scope, this);
                };
                $(this.$el).w2grid(options);
                this.refresh();
            },


            /**
             * Initialises and returns a new w2Grid instance for expanded rows
             * @param scope
             * @param name
             */
            initSubGrid: function(scope, name, instrs){
                var options = this.defaultOptions(name, false);
                options.columns = this.defaultColumns(scope, 315, false);
                options.records = this.parseRecords(instrs);
                options.show.lineNumbers = true;
                options.onChange = function(event) {
                    scope.onSelectionGridChange(event);
                };
                return $().w2grid(options);
            },


            /**
             *
             */
            initOptionsMenu: function(){
                var that = this;
                this.menu = new OptionsMenu({model:this.model});
                this.listenTo(this.menu, 'select', function(data){
                    var item = (data.isMarket == 'true') ?
                        this.model.findMarket(data.id) :
                        this.model.findInstr(data.id);
                    that.pm[data.option](item, data.isMarket);
                    that.clearUnsavedOptions(data, item);
                })
            },


            clearUnsavedOptions: function(data, item){
                if (data.isMarket == 'true') return;
                if (data.option === 'settleByMarket' || data.option === 'unsettleByScope'){
                    if (_.has(item.adjustments, 'result')){
                        var adjustment = item.adjustments['result'];
                        $(adjustment.target).removeClass('unsaved');
                    }
                }
            },


            /**
             * Grid initialisation options.  For views extending this base class,
             * override these methods to configure an alternative configuration.
             */


            /**
             * Defaults grid options - applies to both main/sub grids
             * @param name
             */
            defaultOptions: function(name, mainGrid){
                return {
                    header: '',
                    name: name,
                    fixedBody: false,
                    recordHeight: 30,
                    multiSelect: false,
                    show: {
                        toolbar: false,
                        footer: false,
                        header: false,
                        columnHeaders: mainGrid
                    }
                }
            },


            /**
             * Default grid columns - applies to both main/sub grids
             * @returns {*[]}
             */
            defaultColumns: function(scope, size, isMarket){
                var active = (this.model.get('state') == 'ACTIVE') ? "on" : "",
                    disp = (this.model.get('displayed')) ? "on" : "";
                return [
                    { field: 'name', caption: 'Name', size: size+'px', sortable: true,
                        render: function (record) {
                            return _.template(itemName, {name:record.name, id:record.item.id, isMarket:isMarket});
                        }
                    },
                    { field: 'ad', caption: 'Act/Displ', size: scope.smColumn, style: 'text-align: center',
                        render: function (record) {
                            return _.template(itemIcons, {record:record, active:active, displayed:disp});
                        }
                    },
                    { field: 'frac', caption: 'Frac', size: scope.smColumn, style: 'text-align: center', sortable: true},
                    { field: 'dec', caption: 'Dec', size: scope.smColumn, style: 'text-align: center', sortable: true},
                    { field: 'result', caption: 'Result', size: scope.smColumn, style: 'text-align: center', sortable: true,
                        render: function (record) {
                            return _.template(resultSelector, {result:record.result, record:record, isMarket:isMarket, open:record.item.resultConfirmed});
                        }
                    },
                    { field: 'stake', caption: 'Stake', size: scope.smColumn, style: 'text-align: center', sortable: true},
                    { field: 'liab', caption: 'Liab', size: scope.smColumn, style: 'text-align: center', sortable: true},
                    { field: 'spots', caption: 'Spots', size: scope.smColumn, style: 'text-align: center', sortable: true}
                ]
            },


            /**
             * Handlers
             */


            /**
             * @param e
             */
            onOpenOptions: function(e){
                var isMarket = $(e.currentTarget).data('is-market'),
                    id = $(e.target).data('id'),
                    items = (isMarket) ?
                        this.optionsMenu.marketItems :
                        this.optionsMenu.instrumentItems;

                this.menu.open(e, {id:id, isMarket:isMarket, items:items});
            },


            /**
             * @param e
             */
            onResultSelected: function(e){
                var id = $(e.target).data('id').toString(),
                    isMarket = $(e.target).data('is-market');

                var item = (isMarket) ?
                    this.model.findMarket(id) :
                    this.model.findInstr(id);

                item.addAdjustment(e.target, 'result', e.target.value);
                $(e.target).addClass('unsaved');
            },


            /**
             * Expand row handler
             * @param event
             * @param scope
             * @param grid
             */
            onExpandRow: function (event, scope, grid) {
                var item = grid.get(event.recid).item,
                    channel = item.getChannel(),
                    height = channel.Instruments.length * grid.recordHeight,
                    subName = 'subgrid-' + item.id;

                // destroy any previous subgrid
                if (w2ui.hasOwnProperty(subName))
                    w2ui[subName].destroy();

                // expand main grid to accomodate sub
                $('#'+ event.box_id).animate({ height: height+'px' }, 10);

                // build and add subGrid
                setTimeout(function () {
                    var subGrid = scope.initSubGrid(scope, subName, channel.Instruments.models);
                    $('#'+ event.box_id).w2render(subGrid);

                    subGrid.resize();
                    grid.resize();

                }, 300);
            },


            /**
             * @param event
             */
            onSelectionGridChange: function(event){
                var valueNew = event.value_new;
                var valueOld = event.value_previous;
                var grid = w2ui[event.target];
                console.log('selection grid change from '+valueNew+' to '+valueOld);
            },


            /**
             * Parses the specified collection to w2grid record hash
             */
            parseRecords: function(models){
                return _.map(models, function(item){
                    console.log("model: "+JSON.stringify(item));
                    return {
                        recid:      item.id,
                        name:       item.get('name'),
                        item :      item,
                        stake :     '-',
                        liab :      '-',
                        spots :     '-',
                        pl :        '-',
                        frac :      item.get('fractionalOdds'),
                        dec :       item.get('decimalOdds'),
                        result:     item.get('result')
                    };
                });
            },


            /**
             * Utility method to refresh the grid
             */
            refresh: function(){
                var that = this;
                setTimeout(function(){ w2ui[that.gridId].refresh();}, 300);
            },


            /**
             * Options menu settings
             */
            optionsMenu: {
                marketItems: [
                    { title: 'View Bets', class: 'viewBets' },
                    { title: 'Settle', class: 'settleByMarket' },
                    { title: 'Un-Settle', class: 'unsettleByScope' },
                    { title: 'View Audit', class: 'viewAudit' }
                ],
                instrumentItems: [
                    { title: 'View Bets', class: 'viewBets' },
                    { title: 'Settle', class: 'settleByMarket' },
                    { title: 'Un-Settle', class: 'unsettleByScope' }
                ]
            }

        });


        return BaseView;
    });
