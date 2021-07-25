const express = require("express");
const router = express.Router();

const {findDepartments , findDesignations , findRoles} = require("../controllers/find");

router.get('/findDept',findDepartments);
router.get('/findDesg',findDesignations);
router.get('/findRole',findRoles);

module.exports = router;

