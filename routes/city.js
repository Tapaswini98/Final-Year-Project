const express =require("express");
const router = express.Router();
const {getCity} = require("../controllers/city"); 

router.get("/city",getCity);
router.post("/city",getCity);

module.exports = router;