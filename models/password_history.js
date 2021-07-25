const mongoose = require('mongoose');

let passwordHistorySchema = mongoose.Schema({
    password_id:{
        type:Number,
        maxLength:11,
        unique:true,
        required:true
    },
    user_id_fk:{
        type:Number,
        maxLength:11,
        required:true
    },
    password:{
        type:String,
        maxLength:100,
        required:true
    },
    change_date_time:{
        type:Date,
        default:Date.now,
        required:true
    }
});

module.exports = mongoose.model('PasswordHistory',passwordHistorySchema)
