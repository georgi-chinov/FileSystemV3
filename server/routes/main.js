var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('./../db.js');

router.get('/', function(req, res) {
    console.log(req.session);
    if (!req.session.isLogged) {
        res.sendStatus(401);
        return;
    }
    res.sendStatus(200);

})

router.post('/', function(req, res) {

    // Renaming the uploaded file
    var smth = req.file.originalname.split('.');
    var filePath = './uploads/' + req.file.filename
    fs.rename(filePath, filePath + '.' + smth.pop())
    console.log(req.session);
    console.log();
    res.send();
});

module.exports = router;
