const mongoose = require("mongoose");

let userZoneSchema = mongoose.Schema({
id:{
    type:Number,
    maxLength:11,
    required:true
},
user_id:{
    type:Number,
    maxLength:11,
    required:true
},
division_id:{
    type:Number,
    maxLength:11,
    required:true
},
subdivision_id:{
    type:Number,
    maxLength:11,
    required:true
}
});

module.exports = mongoose.model('UserZone',userZoneSchema);