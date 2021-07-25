const {plcDevices} = require("../controllers/plcdevices.controller");
const express = require("express")
const router = express.Router();

router.post("/plcDevice",plcDevices);

module.exports = router;
