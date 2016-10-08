var express = require("express");
var router = express.Router();

router.use('/lostpassword', require('./forgottenpw'));


module.exports = router;