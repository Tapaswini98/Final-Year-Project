const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const UserLogin = require("../models/user_login");
const Plc = require("../models/plcdevices.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const svgCaptcha = require("svg-captcha");
const user = require("../models/user");

exports.registerUser = (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      return res.json({
        error: err,
      });
    }
    const user = new User({
      plcId: req.body.plcId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
      designation: req.body.designation,
      department: req.body.department,
      role: req.body.role,
    });
    //console.log(user);
    user
      .save()
      .then(() => {
        res.json({
          message: "User added successfully",
        });
      })
      .catch((err) => {
        res.json({
          message: "An error occured!",
          messageBody: err,
        });
      });
  });
};

exports.captcha = (req, res) => {
  var captcha = svgCaptcha.create();
  //req.session.save();
  req.session.captcha = captcha.text;
  //console.log(captcha.text);
  res.type("svg");
  res.status(200).send(captcha.data);
};

exports.login = (req, res) => {
  //const errors = validationResult(req);
  let email = req.body.username;
  let password = req.body.password;
  let captcha = req.body.captcha;
  //console.log(captcha);

  if (captcha != req.session.captcha) {
    res.render("landing", {
      captcha: "Captcha doesn't match",
      user: "",
      password: "",
    });
  } else {
    User.findOne({
      email: email,
    }).then((user) => {
      if (!user) {
        res.render("landing", {
          user: "User not found",
          captcha: "",
          password: "",
        });
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          } else if (result) {
            let token = jwt.sign(
              {
                name: user.name,
              },
              "verySecretValue",
              {
                expiresIn: "1h",
              }
            );
            //const plcData =
            console.log(user);
            console.log(user.role);
            if (user.role == "ADMIN") {
              console.log("IF executed");
              Plc.find({})
                .select(" -__v -_id ")
                .then((doc) => {
                  console.log("**********");

                  let plcArray = [];
                  doc.forEach((a) => {
                    plcArray.push(a);
                  });
                  console.log(plcArray);
                  res.render("dashboard", {
                    // name:user.name,
                    // plcId:user.plcId,

                    userData: {
                      name: user.name,
                      plcs: JSON.stringify(plcArray),
                      email: user.email,
                      phoneNo: user.phone,
                    },
                    status1: true,
                    role: user.role,
                  });
                });
            } else {
              console.log("ELSE executed");
              Plc.findOne({ plcId: user.plcId }).then((doc) => {
                console.log("**********");
                console.log(doc);
                res.render("dashboard", {
                  // name:user.name,
                  // plcId:user.plcId,
                  userData: {
                    name: user.name,
                    plcId: doc.plcId,
                    location: doc.location,
                    lat: doc.lat,
                    lng: doc.lng,
                    email: user.email,
                    phoneNo: user.phone,
                  },
                  role: "USER",
                  status1: true,
                });
              });
            }
            //console.log(plcData)
            // res.send(token);
          } else {
            res.render("landing", {
              password: "Password does not match",
              captcha: "",
              user: "",
            });
          }
        });
      }
    });
  }
};

exports.updatePassword = (req, res) => {
  let userEmail = req.body.email;
  console.log(userEmail);
  let currentPassword = req.body.currentPassword;
  console.log(currentPassword);
  // let newPassword = req.body.newPassword;
  let newConfirmPassword = req.body.newPassword;
  console.log(newConfirmPassword);

  // bcrypt.hash(currentPassword, 10, function (err, hashedPass) {
  //   if (err) {
  //     return res.json({
  //       error: err,
  //     });
  //   }
  //   console.log(hashedPass);
  User.findOne({ email: userEmail }).then((user) => {
    console.log("inside findone");
    if (!user) {
      console.log("User not found");
    } else {
      console.log("inside findone else");
      bcrypt.compare(currentPassword, user.password, function (err, result) {
        console.log("inside bcrypt1", err, result);
        if (err) {
          res.json({
            error: "Password didn't match",
          });
        }
        if (result) {
          console.log("inside bcrypt1 else");
          //if (newPassword === newConfirmPassword) {
          bcrypt.hash(newConfirmPassword, 10, function (er, hashpass) {
            console.log("inside bcrypt2");
            if (er) {
              return res.json({
                status: "10",
                error: "error",
              });
            }
            user.password = hashpass;
            user
              .save()
              .then(() => {
                console.log("inside save then");
                res.json({
                  status: "11A",
                  message: "Password changed successfully",
                });
              })
              .catch((error) => {
                console.log("inside save error");
                res.json({
                  status: "10",
                  message: "An error occured!",
                  messageBody: error,
                });
              });
          });
          // } else {
          //   console.log("New password and confirm password doesn't match");
          //   res.send({msg:"New password and confirm password doesn't match"})
          // }
        }
        else {
          console.log("You have entered wrong password");
          res.send({status: "11B",message:"You have entered wrong password"})
        }
      });
    }
  });
  // });
};
