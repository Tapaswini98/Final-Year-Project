const mongoose = require('mongoose');
const Plc = require("./plcdevices.model");

let userSchema = mongoose.Schema({
    plcId:{
        type:String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String
    },
    department: {
        type: String
    },
    role: {
        type: String
    }
});


module.exports = mongoose.model('User', userSchema);