const express = require("express");
const router = express.Router();

const { getUserById,getUser,updateUser} = require("../controllers/user");
const { registerUser ,login,updatePassword} = require("../controllers/auth");

router.param("userId", getUserById);

router.put("/user",registerUser,updateUser);

router.post("/landing",login);

router.get("/user", getUser);
router.post("/changePassword",updatePassword)

router.get('/', (req, res) => {
    res.render('landing',{captcha:"",user:"",password:""});
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard',{userData:"",status1:false,role:""});
});
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) {
            return console.log(err);
        }
    });
    res.redirect('/');
});

router.get('/livechart',(req,res)=>{
    res.render('livechart',{name:"",plcId:""})
});
router.get('/analytical',(req,res)=>{
    res.render('analytical',{name:"",plcId:""});
});
router.get('/piechart',(req,res)=>{
    res.render('piechart',{name:"",plcId:""});
})
router.get('/changePassword',(req,res)=>{
    res.render('changePassword',{name:"",plcId:""});
})
router.get('/reports',(req,res)=>{
    res.render('reports',{name:"",plcId:""});
})
module.exports = router;