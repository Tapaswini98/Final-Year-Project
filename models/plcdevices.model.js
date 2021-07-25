const mongoose = require("mongoose");

let plcDervicesSchema = mongoose.Schema({
    plcId:{
        type:String,
        unique:true,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    lat:{
        type:String,
    },
    lng:{
        type:String,
    }
})

module.exports = mongoose.model('Plc',plcDervicesSchema)