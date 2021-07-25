const City = require("../models/city");
const  mysqlDB = require("../database");
const mongo = require("../models/mongo");

//const db = process.env.MYSQLDATABASE;
exports.getCity = (req, res)=>{
    const cityData = mysqlDB.query(`Select * from city`,(err,result)=>{
         if(err){
             return res.status(400).json({
                 err:"Error in fetching data"
             })
         }
         console.log(result.forEach(function(a){
             mongo.insertDocument(a,"cities",function(){

             })
         }))
        return ("1");

    });
    //console.log(cityData);

    //   db.collection('City').insertMany(cityData,(err, city) => {
    //     if (err) {
    //       return res.status(400).json({
    //         err: "NOT able to save user in DB"
    //      });
    //     }
    //   return res.json({
    //       msg:"Data inserted successfully"
    //    }); 
    // });   
}