var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
var nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "filesystemfinal@gmail.com",
        pass: "ihaveapen"
    }
});

router.post('/', function (req, res) {
	var newpass = randomstring.generate({
		  length: 12,
		  charset: 'alphabetic'
		});
	var mailOptions={
      to : req.body.to,
      subject : 'Forgotten password',
      text : 'Your new password is:' + newpass + ' . You can login to change it.'
	}
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
          console.log(error);
          res.end("error");
		}else{
          console.log("Message sent: " + response.message);
          res.end("sent");
       }
	});
});
module.exports = router;