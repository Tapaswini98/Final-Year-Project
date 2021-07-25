const mongoose = require("mongoose");

let departmentSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model("Department",departmentSchema, "departments");