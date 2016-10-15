var express = require('express');
var router = express.Router();
var db = require('./../db.js');

router.get('/', function(req, res) {
    if (req.session.isLogged) {
        req.session.destroy();
        res.send({
            logout: true
        })
    }
});

module.exports = router;
