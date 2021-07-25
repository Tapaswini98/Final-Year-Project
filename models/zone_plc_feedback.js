const mongoose = require("mongoose");

let plcFeedbackSchema = mongoose.Schema({
feedback_id:{
    type:Number,
    maxLength:11,
    required:true
},
plc_slno:{
    type:String,
    maxLength:20,
    default:null
},
valvefeedback:{
    type:String,
    maxLength:1,
    required:true
},
date_time:{
    type:String,
    required:true
}

});

module.exports = mongoose.model('PlcFeedback',plcFeedbackSchema);