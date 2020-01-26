var mongoose = require('mongoose');

var helpSchema = new mongoose.Schema({
    name : {type : String , required : true},
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

var Help = mongoose.model("Help",helpSchema);

module.exports = Help;