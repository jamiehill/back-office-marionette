/**
 * Created by Jamie on 22/09/2014.
 */
define([
        'marionette'
    ],
    function (Marionette) {
        return Marionette.Controller.extend({
            dependencies: 'vent, commands',


            /**
             *
             */
            ready: function(options){
                _.bindAll(this, 'onSessionStarted');
                this.vent.on('session:loggedin', this.onSessionStarted);
            },


            /**
             *
             */
            onSessionStarted: function() {
                this.commands.execute('command:getChildAccounts');
            }
        });
    });