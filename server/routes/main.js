var express = require('express');
var router = express.Router();
var db = require('./../db.js');
router.post('/', function(req, res) {

    console.log(req.file);
    res.send();
});
module.exports = router;
