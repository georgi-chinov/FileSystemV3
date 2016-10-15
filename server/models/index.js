var express = require("express");
var router = express.Router();

router.use('/lostpassword', require('./password'));

module.exports = routes;
