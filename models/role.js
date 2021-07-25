const mongoose = require("mongoose");

let roleSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required:true
    }
})

module.exports  = mongoose.model("Role",roleSchema);