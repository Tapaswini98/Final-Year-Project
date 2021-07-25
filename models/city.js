const mongoose = require("mongoose");

let citySchema = mongoose.Schema({
   id:
    { 
       type:Number,
       required:true,
       maxLength:11,
       unique:true
    },
    city_name:{
        type:String,
        maxLength:50,
        required:true
    },
    lat:{
        type:String,
        maxLength:50,
        required:true
    },
    lng:{
        type:String,
        maxLength:50,
        required:true
    },
    seq:{
        type:Number,
        maxLength:11,
        required:true
    }

});
module.exports = mongoose.model('City',citySchema,'cities')