const mongoose = require("mongoose");

let userTypeSchema = mongoose.Schema({
user_type_table_id:{
    type:Number,
    maxLength:11,
    required:true
},
user_table_name:{
    type:String,
    maxLength:12,
    required:true
}
});

module.exports = mongoose.model('UserType',userTypeSchema);