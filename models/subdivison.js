const mongoose = require('mongoose');

let subDivisionSchema = mongoose.Schema({
    subdivision_id:{
        type:Number,
        maxLength:11,
        unique:true,
        required:true
    },
    subdivision_name:{
        type:String,
        maxLength:30,
        required:true
    },
    subdivision_id_fk:{
        type:Number,
        maxLength:11,
        required:true 
    },
    subdivision_activation_date:{
        type:Date,
        required:true
    },
    subdivision_is_active:{
       type:Number,
       maxLength:1,
       required:true
    }
})
module.exports = mongoose.model('SubDivision',subDivisionSchema);