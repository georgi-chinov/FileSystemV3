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
    //Checking if the old passs is correct and changing it
    if (req.body.oldPassword) {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.session.user, req.body.oldPassword], function(err, results, query) {
            if (!err) {
                if (results.length) {
                    db.query('UPDATE users SET password = ? WHERE username = ?', [req.body.password, req.session.user], function(err, results, query) {
                        if (!err) {
                            res.send({
                                legit: true
                            })
                        }
                    })
                    return;
                }
                res.send({
                    legit: false
                })
            }
        })
    }

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
    //File stuff
    if (req.file) {
        console.log(req.file);
        // Adding the files to the DB
        filenfo = {
            name: req.file.originalname,
            user: req.session.user,
            path: req.file.path,

        }
        db.query('INSERT INTO files SET ?', filenfo)
            // Renaming the uploaded file
        var smth = req.file.originalname.split('.');
        var filePath = './uploads/' + req.file.filename
        fs.rename(filePath, filePath + '.' + smth.pop())
        console.log(req.session);
        console.log();
        res.send();
    }
});

module.exports = router;
