define(['marionette', 'app/model/EventDetailsModel', 'common/service/ApiService'],

    function (Marionette, EventDetailsModel, ApiService) {
    return Marionette.Module.extend({
        startWithParent: false,


        /**
         *
         */
        initialize: function(options, moduleName, app){
            app.models = {
                eventModel: new EventDetailsModel({vent: app.vent})
            }

            app.services = {
                api: new ApiService({url:app.endpoint})
            }
        }
    });
});