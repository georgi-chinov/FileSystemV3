var nodemailer = require("nodemailer");
var express = require("express");
var randomstring = require("randomstring");
var bodyParser = require('body-parser');
var router = express.Router();
var app=express();


//Mailer NFO
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "filesystemfinal@gmail.com",
        pass: "ihaveapen"
    }
});

app.get('/',function(req,res){
    res.sendfile('email.html');
});

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
	

app.post('/',function(req,res){
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
