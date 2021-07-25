const mongo = require("../models/mongo");

exports.findDepartments = (req,res)=>{
    var query  = [{$match:{name:{$exists:true}}},
    {$project:{_id:0,name:1}}];
    const deptNames = mongo.aggregation("departments",query,(err,result)=>{        
        res.send(result);
   });
    // console.log(deptNames);
}

exports.findDesignations = (req,res)=>{
    var query =[{$match:{name:{$exists:true}}},{$project:{_id:0,name:1}}];
    const desigNames = mongo.aggregation("designations",query,(err,result)=>{
        res.send(result);
   });
   // console.log(desigNames);
}
exports.findRoles = (req,res)=>{
    var query =[{$match:{name:{$exists:true}}},{$project:{_id:0,name:1}}];
    const roleNames = mongo.aggregation("roles",query,(err,result)=>{
        res.send(result);
   });
   // console.log(roleNames);
}