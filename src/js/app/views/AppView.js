define(['marionette'],
    function (Marionette) {
    return Marionette.View.extend({
        onShow: function(){
            var template = _.template('<h1>Hello!</h1>', {});
            this.$el.html(template);
        }
    });
});