define([
    'marionette',
    'app/view/main/markets/sports/BaseView',
    'app/view/main/markets/sports/horses/HorsesViewPM',

    'text!app/view/main/markets/sports/templates/ActiveDisplayed.tpl.html',
    'text!app/view/main/markets/sports/templates/OptionsMenu.tpl.html',
    'text!app/view/main/markets/sports/templates/ItemName.tpl.html',
    'text!app/view/main/markets/sports/templates/ResultSelector.tpl.html'
],
function (Marionette, BaseView, HorsesViewPM, itemIcons, optionsMenu, itemName, resultSelector) {

    return BaseView.extend({
        pm: new HorsesViewPM,


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
                        return _.template(itemIcons, {record:record,active:active, displayed:disp});
                    }
                },
                { field: 'position', caption: 'Position', size: scope.smColumn, sortable: false, attr: 'align=center' },
                { field: 'frac', caption: 'Frac', size: scope.smColumn, style: 'text-align: center', sortable: true},
                { field: 'dec', caption: 'Dec', size: scope.smColumn, style: 'text-align: center', sortable: true},
                { field: 'result', caption: 'Result', size: scope.smColumn, style: 'text-align: center', sortable: true,
                    render: function (record) {
                        return _.template(resultSelector, {result:record.result, record:record, isMarket:isMarket, open:record.item.resultConfirmed});
                    }
                },
                { field: 'lpDed', caption: 'LPR4', size: scope.miniColumn, sortable: true, attr: 'align=center'},
                { field: 'lpTime', caption: 'LPR4 Time', size: scope.mdColumn, sortable: true, attr: 'align=center'},
                { field: 'spDed', caption: 'SPR4', size: scope.miniColumn, sortable: true, attr: 'align=center'},
                { field: 'spTime', caption: 'SPR4 Time', size: scope.mdColumn, sortable: true, attr: 'align=center'},
                { field: 'sp', caption: 'SP', size: scope.smColumn, sortable: true, attr: 'align=center'},
                { field: 'dh', caption: 'Deduction', size: scope.smColumn, sortable: true, attr: 'align=center'},
                { field: 'pl', caption: 'P/L', size: scope.smColumn, sortable: true, attr: 'align=center'},
                { field: 'bets', caption: 'Bets', size: scope.smColumn, sortable: true, attr: 'align=center'},
                { field: 'stake', caption: 'Stake', size: scope.smColumn, sortable: true, attr: 'align=center'},
                { field: 'liab', caption: 'Liab', size: scope.smColumn, sortable: true, attr: 'align=center'}
            ]
        },


        /**
         * Parses the specified collection to w2grid record hash
         */
        parseRecords: function(models){
            return _.map(models, function(item){
                return {
                    recid: item.id,
                    name: item.get('name'),
                    item: item,
                    position: item.get('position'),
                    result: item.get('result'),
                    lpDed: item.get('lpDeductionAmount'),
                    lpTime: item.get('lpDeductionTime'),
                    spDed: item.get('spDeductionAmount'),
                    spTime: item.get('spDeductionTime'),
                    sp: item.get('startingPrice'),
                    dh: item.get('deduction'),
                    pl: item.get('profitLoss'),
                    bets: item.get('bets'),
                    stake: item.get('stake'),
                    liab: item.get('liab'),
                    frac :   item.get('fractionalOdds'),
                    dec :       item.get('decimalOdds')
                };
            });
        }
    });
});
