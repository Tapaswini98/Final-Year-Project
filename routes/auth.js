const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {registerUser ,login,captcha} = require("../controllers/auth");

//const jwt = require("jsonwebtoken");

router.post('/register',
[
    check("email", "email is required").isEmail(),
    check("mobile is required").isMobilePhone()
]
,registerUser);

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/captcha',captcha) ;

module.exports = router;