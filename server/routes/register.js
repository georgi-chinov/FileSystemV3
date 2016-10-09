var express = require('express');
var router = express.Router();
var db = require ('./../db.js');

router.post('/', function (req, res) {

	usernfo = {username: req.body.name,password:req.body.password,email:req.body.email}
	console.log(usernfo);
	db.query('INSERT INTO users SET ?',usernfo, function(err, results, query) {
	    if (err) {
	    	res.send('User exists!');
	    }
	    if(!err) {
	    	res.send('User registered!');
	    }
	});
});

module.exports = router;


