const Plc = require("../models/plcdevices.model");

const plcDevices= (req,res)=>{
//   console.log(req.body);
  const plc = new Plc(
    {
        plcId:req.body.plcId,
        location:req.body.location,
        lat:req.body.lat,
        lng:req.body.lng
    }
  );

  plc.save().then((err,doc)=>{
      if(err){
        //   console.log(err);
          res.send(err);
      }
      else{
        res.send(doc)
      }
  
  })
 
  //res.send(data);
}

module.exports ={
    plcDevices
}