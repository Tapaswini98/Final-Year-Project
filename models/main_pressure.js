const mongoose = require('mongoose');

let mainPressureSchema = mongoose.Schema({
      pressure_id:{
          type:Number,
          maxLength:11,
          unique:true,
          required:true
      },
      pressure_name:{
          type:String,
          maxLength:20,
          required:true
      },
      pressure_bar:{
          type:String,
          maxLength:5,
          required:true
      }
})

module.exports = mongoose.model('Main_Pressure',mainPressureSchema);