var express = require('express');
var router = express.Router();
var db = require('./../db.js');
router.post('/', function(req, res) {
    usernfo = {
        username: req.body.name,
        password: req.body.password
    }
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.name, req.body.password], function(err, results, query) {
        if (err) {
            res.send('User not registered!');
        }
        if (!err) {
            if (results.length) {
                console.log('setting');
                req.session.user = req.body.name;
                res.send("Logged!");
                return;
            }
            res.send("No such user!");
        }
    });
});
module.exports = router;
