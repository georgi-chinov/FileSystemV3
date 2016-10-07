var express = require("express");
var router = express.Router();

router.use('/', require('./lostPassword'));


module.exports = router;