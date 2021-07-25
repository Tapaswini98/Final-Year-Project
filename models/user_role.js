const mongoose = require("mongoose");

let userRoleSchema = mongoose.Schema({
id:{
    type:Number,
    maxLength:11,
    required:true
},
role:{
    type:String,
    maxLength:50,
    required:true
}
});

module.exports = mongoose.model('UserRole',userRoleSchema);