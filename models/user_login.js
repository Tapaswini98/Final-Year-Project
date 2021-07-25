const mongoose = require('mongoose');
const User = require('./user')

let userLoginSchema = mongoose.Schema({
    // user_id:{
    //     type:Number,
    //     maxLength:11,
    //     unique:true,
    //     required:true
    // },
    user_name:{
        type:String,
        maxLength:10,
        required:true
    },
    password:{
        type:String,
        maxLength:200,
        required:true 
    },
    operation_password:{
        type:String,
        maxLength:10,
        required:true 
    },
    mobile_no:{
       type:String,
       maxLength:10,
       required:true
    },
    full_name:{
       type:String,
       maxLength:25,
       required:true
    },
    user_id:{
      type:mongoose.Schema.ObjectId,
      ref:'User',
      maxLength:11,
      required:true
    },
    user_type_table_id_fk:{
        type:Number,
        maxLength:11,
      //  required:true
    },
    user_type_id_fk:{
        type:Number,
        maxLength:11,
      //  required:true
    },
    plc_id_fk:{
        type:Number,
        maxLength:11,
        required:true 
    },
    user_role_id_fk:{
        type:Number,
        maxLength:11,
        default:null
    },
    login_status: {
        type:String,
        maxLength:3,
        default:null
    },
    login_time:{
        type:Date,
        default:null
    }
})
module.exports = mongoose.model('UserLogin',userLoginSchema);