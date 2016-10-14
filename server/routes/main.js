var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('./../db.js');
router.post('/', function(req, res) {


    // Renaming the uploaded file
    var smth = req.file.originalname.split('.');
    var filePath = './uploads/' + req.file.filename
    fs.rename(filePath, filePath + '.' + smth.pop())

    res.send();
});
router.get('/', function(req, res, next) {
    var sess = req.session
    if (sess.views) {
        sess.views++
            res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + sess.views + '</p>')
        res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        sess.views = 1
        res.send('welcome to the session demo. refresh!')
    }
})
module.exports = router;
