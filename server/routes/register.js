var express = require('express');
var router = express.Router();
var db = require('./../db.js');
router.post('/', function(req, res) {
    // make it check for email and username seperately
    usernfo = {
        username: req.body.name,
        password: req.body.password,
        email: req.body.email
    }
    db.query('INSERT INTO users SET ?', usernfo, function(err, results, query) {
        if (err) {
            console.log(err);
            res.send('User exists!');
        }
        if (!err) {
            res.send('User registered!');
        }
    });
});
module.exports = router;
