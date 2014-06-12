define(function(require) {
    var EventDetailsModel = require('app/model/EventDetailsModel');
    return {
        eventModel: new EventDetailsModel()
    }
})