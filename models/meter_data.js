const mongoose = require('mongoose');

let meterDataSchema = mongoose.Schema({
    meter_id:{
        type:Number,
        maxLength:111,
        unique:true,
        required:true
    },
    meter_name:{
        type:String,
        maxLength:20,
        required:true
    },
    flow:{
        type:String,
        maxLength:30,
        required:true
    }
});

module.exports = mongoose.model('MeterDataSchema',meterDataSchema)