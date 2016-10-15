var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('./../db.js');

router.get('/', function(req, res) {
    if (!req.session.isLogged) {
        res.sendStatus(401);
        return;
    }
    res.sendStatus(200);

})

router.post('/', function(req, res) {

    //Checking if the old passs is correct
    if ()

    //Adding folder names to DB
        if (req.body.name) {
            var folderInfo = {
                name: req.body.name,
                user: req.session.user,
            }
            db.query('INSERT INTO folders SET ?', folderInfo, function(err, results, query) {
                if (err) {
                    console.log(err);
                }
                if (!err) {
                    res.sendStatus(200)
                }
            });
        }
        // Renaming the uploaded file
    if (req.file) {
        var smth = req.file.originalname.split('.');
        var filePath = './uploads/' + req.file.filename
        fs.rename(filePath, filePath + '.' + smth.pop())
        console.log(req.session);
        console.log();
        res.send();
    }
});

module.exports = router;
