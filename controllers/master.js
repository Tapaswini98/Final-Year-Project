const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const Designation = require('../models/designation');
const Role = require('../models/role');

exports.designation = (req, res) =>
{
    const desig= new Designation({
        name : req.body.name,
        id:req.body.id
    });
    desig.save().then(()=>{
        res.json({
            message:"Designation added successfully"
     });
    }).catch(()=>{
        res.json({
                message:"An error occured!"
        })
    }); 
}
exports.department = (req, res) =>{
    const dept = Department({
        name : req.body.name,
        id:req.body.id
    
    })
    dept.save().then(()=>{
        res.json({
            message:"Department added successfully"
     });
    }).catch(()=>{
        res.json({
                message:"An error occured!"
        });
    }); 
};
exports.role = (req, res) =>{
    const rol = new Role({
        name : req.body.name,
        id:req.body.id
    });
    rol.save().then(()=>{
        res.json({
            message:"Role added successfully"
     });
    }).catch(()=>{
        res.json({
                message:"An error occured!"
        });
    }); 
};

