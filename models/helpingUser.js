var mongoose = require('mongoose'),
passportLocalMongoose   = require('passport-local-mongoose');

var helpSchema = new mongoose.Schema({
    username : {type : String , required : true},
    password : {type : String , required : true},
    email : {type : String , required : true},
    phone : {type : String , required : true},
    referredNeedy : 
    [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "needyUser"
    }],
    donationsMade :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ngo"        
    }
});

helpSchema.plugin(passportLocalMongoose);

var Help = mongoose.model("Help",helpSchema);

module.exports = Help;