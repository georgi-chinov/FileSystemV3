var express = require('express');
var router = express.Router();
var db = require ('./../db.js');


router.post('/', function (req, res) {

	usernfo = {username: req.body.name,password:req.body.password}
	console.log(req.session.name);
	db.query('SELECT * FROM users WHERE username = ? AND password = ?',[req.body.name,req.body.password], function(err, results, query) {
	    if (err) {
	    	res.send('User not registered!');
	    	console.log(err);
	    }
	    if(!err) {
	    	if (results.length) {
	    		res.send ("Logged!");
	    		req.session.user = 'hi';
	    		return;
	    	}
	    	res.send ("No such user!");
	    }
	});
});

module.exports = router;