const PlcFeedback = require("../models/zone_plc_feedback");
const  mysqlDB = require("../database");
const mongo = require("../models/mongo");

exports.getZonePlcFeedback = (req, res)=>{

    const liveFeedback = mysqlDB.query(`Select * from zone_plc_feedback`,function(err,result){
         if(err){
             return res.status(400).json({
                 err:"Error in fetching data"
             })
         }
         result.forEach((a) =>{
             mongo.insertDocument(a,"zone_plc_feedback",function(){
                 
             })
         })
        return ("1");

    });
    console.log(liveFeedback);
}    