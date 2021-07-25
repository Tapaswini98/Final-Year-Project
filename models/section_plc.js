const mongoose = require('mongoose');

let sectionPlcSchema = mongoose.Schema({
    section_plc_id:{
        type:Number,
        maxLength:11,
        unique:true,
        required:true
    },
    plc_slno:{
        type:Number,
        maxLength:111,
        required:true
    },
    plc_section_id:{
        type:Number,
        maxLength:11,
        required:true 
    },
    plc_is_active:{
       type:Number,
       maxLength:1,
       required:true
    }
})
module.exports = mongoose.model('SectionPlc',sectionPlcSchema);