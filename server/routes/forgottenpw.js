var nfo = require ('./../credentials.js');
var db = require ('./../db.js');
var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
var nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: nfo.email_name,
        pass: nfo.email_password
    }
});

router.post('/', function (req, res) {
	
	db.query('SELECT * FROM users WHERE email = ?',[req.body.to], function(err, results, query) {
	    if(!err) {
	    	if (results.length) {
	    		
	    		var newpass = randomstring.generate({
	    			  length: 12,
	    			  charset: 'alphabetic'
	    			});
	    		var mailOptions={
	    	      to : req.body.to,
	    	      subject : 'Forgotten password',
	    	      text : 'Your new password is:' + newpass + ' . You can login and change it.'
	    		}
	    		
	    		smtpTransport.sendMail(mailOptions, function(error, response){
	    			if(error){
	    	          console.log(error);
	    	          res.end("error");
	    	          return;
	    			} 
						db.query('UPDATE users SET password = ? WHERE email = ?',[newpass,req.body.to])
	    				console.log("Message sent: " + response.message);
	    				res.end("Sent");
	    		});
	    		return;
	    	}
	    	res.send('Wrong email!');
	    }
	});
	
	
	
	
});
module.exports = router;