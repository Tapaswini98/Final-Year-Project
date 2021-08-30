const ZonePlcLivedata = require("../models/zone_plc_livedata");
const mysqlDB = require("../database");
const mongo = require("../models/mongo");
const cron = require('node-cron');
const fetch = require('node-fetch');

// exports.postZonePlcLivedata = (req, res)=>{

//  cron.schedule('05 * * * *', () => {
//     const liveData = mysqlDB.query(`Select * from zone_plc_livedata`,(err,result)=>{
//          if(err){
//              return res.status(400).json({
//                  err:"Error in fetching data"
//              })
//             }
//          result.forEach((a) =>{
//              mongo.insertDocument(a,"zone_plc_livedata",function(){

//              })
//          })
//         return ("1");

//     });
//     console.log(liveData);
// });

// }

const getSQLZonePlcLivedata = (req, res) => {
  const liveData = mysqlDB.query(`Select * from zone_plc_livedata`, (err, result) => {
    if (err) {
      return res.status(400).json({
        err: "Error in fetching data"
      })
    }
    res.send(result);
  })
}

const postSqlPlcLivedata = async (req, res) => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const finalTime = date + " " + time;
  let insertData = {
    data_id: req.body.data_id,
    plc_slno: req.body.plc_slno,
    main_meter_flow: req.body.main_meter_flow,
    main_meter_demand_flow: req.body.main_meter_demand_flow,
    sub_flow_meter_1: req.body.sub_flow_meter_1,
    sub_flow_meter_2: req.body.sub_flow_meter_2,
    sub_flow_meter_3: req.body.sub_flow_meter_3,
    sub_flow_meter_4: req.body.sub_flow_meter_4,
    esr_presure: req.body.esr_presure,
    esr_outlet_presure: req.body.esr_outlet_presure,
    esr_level: req.body.esr_level,
    valve_status: req.body.valve_status,
    gene_red_volt: req.body.gene_red_volt,
    gene_yel_volt: req.body.gene_yel_volt,
    gene_blu_volt: req.body.gene_blu_volt,
    gene_red_current: req.body.gene_red_current,
    gene_yel_current: req.body.gene_yel_current,
    gene_blu_current: req.body.gene_blu_current,
    main_red_volt: req.body.main_red_volt,
    main_yel_volt: req.body.main_yel_volt,
    main_blu_volt: req.body.main_blu_volt,
    main_red_current: req.body.main_red_current,
    main_yel_current: req.body.main_yel_current,
    main_blu_current: req.body.main_blu_current,
    generator_fule_level: req.body.generator_fule_level,
    date_time: finalTime,
    time: req.body.time
  }

  //insertData = JSON.stringify(insertData)
  // console.log(insertData);
  let result1 = await mysqlDB.query(`INSERT INTO zone_plc_livedata VALUES('${insertData.data_id}','${insertData.plc_slno}','${insertData.main_meter_flow}','${insertData.main_meter_demand_flow}','${insertData.sub_flow_meter_1}','${insertData.sub_flow_meter_2}','${insertData.sub_flow_meter_3}','${insertData.sub_flow_meter_4}','${insertData.esr_presure}','${insertData.esr_outlet_presure}','${insertData.esr_level}', '${insertData.valve_status}','${insertData.gene_red_volt}','${insertData.gene_yel_volt}','${insertData.gene_blu_volt}','${insertData.gene_red_current}','${insertData.gene_yel_current}','${insertData.gene_blu_current}','${insertData.main_red_volt}','${insertData.main_yel_volt}','${insertData.main_blu_volt}','${insertData.main_red_current}','${insertData.main_yel_current}','${insertData.main_blu_current}','${insertData.generator_fule_level}','${insertData.date_time}','${insertData.time}' )`, (err, result) => {
    if (err) {
      return res.status(400).json({
        err: err
      })
    }
    //console.log(result.OkPacket);
    if (result.affectedRows == 1) {
      res.send(insertData);
    }
    //res.send(result);
  })

  //res.send("Sent");
}

async function fetchDataFromSql() {
  const response = await fetch("http://localhost:3000/SQLzoneplclivedata");
  const result = response.json();
  return result;
}
// async function fetchDataFromMongo(data){
//   const query =[{ $match:{  data_id:data   } }]
//    mongo.aggregation("zone_plc_livedata", query, (err, result) => {     
//   //  console.log(result,data)
//     return result;
//   });

//   // const zonePlcData = await zone_plc_livedata.find({data_id:data})
// }

const postZonePlcLivedata = (req, res) => {
  // cron.schedule('* * * * *', () => {
  // async function getData() {

  fetchDataFromSql()
    .then((data) => {
      data.forEach((a) => {
        // let getData = fetchDataFromMongo(a.data_id); 
        // if(getData){
        //   a.insertedOn = new Date();
        //   mongo.insertDocument(a, "dupli_data", function () {}) 
        // }else{
        //   console.log(a.data_id)
        //   mongo.insertDocument(a, "zone_plc_livedata", function () {})
        // }
        // console.log(a)
        const { data_id } = a;
        ZonePlcLivedata.findOneAndReplace({ data_id }, a).
          then((err, document) => {
            if (err) {
              // console.log("Error Occured during updation");
              // console.log("Error "+ err);
            } else {
              // console.log("doc "+ document); 
              if (document) {
              } else {
                const zonePlcLivedata = new ZonePlcLivedata(a);
                zonePlcLivedata.save((err, doc) => {
                  if (err) {
                    // console.log("Error Occured during insertion");
                  }
                  else {
                    console.log("Data inserted Successfully")
                  }
                });
              }

            }
          });

      });
      res.send(data);
    })
  // return ("1");
  // }

  // })
  // getData();  
}


const getZonePlcLivedata = (req, res) => {
  // console.log(req.body);
  // var query = [{
  //   $match: {
  //     data_id: {
  //       $exists: true
  //     },
  //     time: {
  //       $ne: null
  //     }
  //   }
  // }, {
  //   $project: {
  //     _id: 0,
  //     date_time: 1,
  //     esr_presure: 1,
  //     esr_outlet_presure: 1,
  //     main_meter_flow: 1,
  //     main_meter_demand_flow: 1,
  //   }
  // }];
  // const zonePlcData = mongo.aggregation("zone_plc_livedata", query, (err, result) => {
  //   res.send(result);
  // });
  const today = new Date;
  const date = today.getFullYear() + '-' +
    ((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1))
    + '-' + today.getDate();
  const preDateStart = date + " 00:00:01";
  const preDateEnd = date + " 23:59:59";
  // console.log(preDateEnd, preDateStart) , date_time: { "$gte": preDateStart, "$lte": preDateEnd } 
  ZonePlcLivedata.find({ "plc_slno": req.body.plcId})
    .select("data_id + plc_slno + date_time + esr_presure + esr_outlet_presure + main_meter_flow + esr_level")
    .sort({ '_id': -1 })
    .limit(req.body.limit)
    .then((documents) => {
      // console.log(documents);
      res.json(documents);
    });

}

// const nrwData =(req,res)=>{

// }
//`Select * from zone_plc_livedata where date_time > now() - interval 5 minute`

module.exports = {
  getSQLZonePlcLivedata,
  postSqlPlcLivedata,
  postZonePlcLivedata,
  getZonePlcLivedata,
}