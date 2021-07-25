const mongoose = require('mongoose');

let divisionSchema = mongoose.Schema({
   division_id:{
       type:Number,
       maxLength:11,
       unique:true,
       required: true
   },
   division_name:{
       type:String,
       maxLength:30,
       required:true
   },
   ivision_activation_date:{
      type:Date,
      required:true

   },
   division_is_active:{
      type:Number,
      maxLength:1,
      required:true
   }

})

mongoose.exports = mongoose.model('Division',divisionSchema);