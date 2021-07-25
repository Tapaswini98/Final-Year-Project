const express =require("express");
const router = express.Router();

const zonePlcData = require("../controllers/zoneplclivedata"); 
const {nrwData} = require("../rabbitTest/nrw")

router.post("/zoneplclivedata",zonePlcData.postZonePlcLivedata);
router.post("/zoneplclivedatas",zonePlcData.getZonePlcLivedata);
router.get("/SQLzoneplclivedata",zonePlcData.getSQLZonePlcLivedata);
router.post("/postSqlData",zonePlcData.postSqlPlcLivedata);
router.post("/nrwData",nrwData)


module.exports = router;