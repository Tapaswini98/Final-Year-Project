const express = require("express");
const router = express.Router();

const {department , designation , role} = require("../controllers/master");

router.get('/designation',(req,res)=>{
    res.render('designation');
})
router.get('/department',(req,res)=>{
    res.render('department');
})
router.get('/role',(req,res)=>{
    res.render('role');
})
router.post('/designation',designation);
router.post('/department',department);
router.post('/role',role);

module.exports = router;
