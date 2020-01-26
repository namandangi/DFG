var mongoose = require('mongoose'),
passportLocalMongoose   = require('passport-local-mongoose');

var eventSchema = new mongoose.Schema({
    name : {type : String , required : true},
    location : {type : String , required : true},
   description : {type : String , required : true},
    
});

var Event = mongoose.model("Event",eventSchema);

module.exports = Event;