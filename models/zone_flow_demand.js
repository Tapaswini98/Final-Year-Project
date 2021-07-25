const mongoose = require("mongoose");

let zoneFlowDemandSchema = mongoose.Schema({
flow_demand_id:{
    type:Number,
    maxLength:11,
    required:true
},
plc_slno:{
    type:String,
    maxLength:15,
    default:null
},
demand_time_from:{
    type:time,
    timestamps:true,
    required:true
},
demand_time_to:{
    type:time,
    timestamps:true,
    required:true
},
demand_flow:{
    type:String,
    maxLength:6,
    required:true
}
});

module.exports = mongoose.model('ZoneFlowDemand',zoneFlowDemandSchema);