var express = require('express');
var router = express.Router();
var db = require ('./../db.js');


router.post('/', function (req, res) {

	usernfo = {username: req.body.name,password:req.body.password}
	console.log(usernfo);
	db.query('SELECT * FROM users WHERE ?',usernfo, function(err, results, query) {
	    if (err) {
	    	res.send('User exists!');
	    	console.log(err);
	    }
	    if(!err) {
	    	res.send('User registered!');
	    }
	});
});

module.exports = router;