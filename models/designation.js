const mongoose = require("mongoose");

let designationSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model("Designation",designationSchema);