const express =require("express");
const router = express.Router();
const {getZonePlcFeedback} = require("../controllers/zoneplcfeedback"); 

router.post("/zoneplcfeedback",getZonePlcFeedback);
router.get("/zoneplcfeedback",getZonePlcFeedback);


module.exports = router;