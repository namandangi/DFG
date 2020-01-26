var mongoose = require('mongoose');

var needySchema = new mongoose.Schema({
//    name : {type : String , required : true},
    name : {type : String },
    age : Number,
    //location : {type : String , required : true},
    location : {type : String},
    image : { type: String },
    description : String,
    impairment : String
});

module.exports = mongoose.model("Need",needySchema);