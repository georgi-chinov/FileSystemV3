var express = require('express');
var router = express.Router();
var db = require ('./../db.js');


router.post('/', function (req, res) {
	req.session.user = 'hi';
	console.log(session.username);
	
});

module.exports = router;