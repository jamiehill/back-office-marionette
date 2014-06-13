define(['marionette'],
    function (Marionette) {
    return Marionette.View.extend({

        initialize: function(){
            var promise = App.services.api.login('test1', 'test1');
            promise.done(function(resp){

            })

            promise.fail(function(resp){

            })
        },


        onShow: function(){
            var template = _.template('<h1>'+App.appName+'</h1>', {});
            this.$el.html(template);
        }
    });
});