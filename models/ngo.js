var mongoose = require('mongoose'),
passportLocalMongoose   = require('passport-local-mongoose');

var ngoSchema = new mongoose.Schema({
    username : {type : String , required : true},
    password : {type : String , required : true},
    email : {type : String , required : true},
    phone : {type : String , required : true},
    description : {type : String , required : true},
    socialLinks : {type : String},
    // payinfo :
    // {
    //     type : String,
    //     required : true
    // },
    // bankdetails :
    // {
    //     ifsc : String,
    //     branchName : String
    // },
    helpedNeedy : 
    [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "needyUser"
    }]

});
ngoSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Ngo",ngoSchema);