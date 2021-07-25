const mongoose = require("mongoose");

let zoneDemandSchema = mongoose.Schema({
zone_demand_id:{
    type:Number,
    maxLength:11,
    required:true
},
section_plc_id:{
    type:Number,
    maxLength:11,
    required:true
},
from_time_demand:{
    type:time,
    timestamps:true,
    required:true
},
to_time_demand:{
    type:time,
    timestamps:true,
    required:true
},
zone_demand_now:{
    type:String,
    maxLength:8,
    required:true
}
});

module.exports = mongoose.model('ZoneDemand',zoneDemandSchema);