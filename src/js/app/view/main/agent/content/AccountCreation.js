/**
 * Created by Jamie on 23/09/2014.
 */
define([
    'marionette',
    'text!app/view/main/agent/content/creation/AccountCreation.tpl.html'
],
function (Marionette, tpl) {
    return Marionette.ItemView.extend({
        dependencies: 'agentModel, commands',


        id: 'tab2',
        className: 'form-body ui-tabs-panel ui-widget-content ui-corner-bottom',
        template: _.template(tpl),
        tagName: "section",


        events: {
            'click #createUser' : 'onCreateUser',
            'click #btnCheck2'   : 'onCheckAvailability',
            'change #account0'  : 'onAccountIdChange',
            'change #account1'  : 'onAccountIdChange',
            'change #account2'  : 'onAccountIdChange'
        },


        /**
         * @param options
         */
        ready: function(options) {
            _.bindAll(this, 'onCreateUser', 'onAccountIdChange', 'onCheckAvailability');
//            this.model = this.agentModel.creation;
        },


        /**
         *
         */
        onCreateUser:  function() {
            var values = $('#createForm').serializeArray();
            var props  = {};
            _.each(values, function(obj) {
                props[obj.name] = obj.value;
            });

            var accountId = this.getAccountId();

            this.model.set(props);
            this.commands.execute('command:createChildAccount', props.username, props.password, props.firstName, props.lastName, props.phone, props.email, props.product, props.minStake, props.betLimit, props.pt, props.vc, props.currency, props.balance, accountId);
        },


        /**
         *
         */
        onCheckAvailability: function() {
            var accountId = this.getAccountId(),
                available = false;
            this.commands.execute('command:checkAccountAvailability', accountId)
                .done(function(resp){
                    if (_.has(resp, 'Result')){
                        available = resp.Result.available;
                    }
                })
        },


        /**
         * Sets the account id
         */
        onAccountIdChange: function() {
            var accountId = this.getAccountId();
            $('#accountId').html(accountId);
        },


        /**
         * @returns {string}
         */
        getAccountId: function() {
            var account0 = $('#account0').val(),
                account1 = $('#account1').val(),
                account2 = $('#account2').val();
            return 'K8-'+account0+'-'+account1+'-'+account2;
        }
    });
});