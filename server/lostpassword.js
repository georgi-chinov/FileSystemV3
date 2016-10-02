var nodemailer = require("nodemailer");
var express = require("express");
var randomstring = require("randomstring");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "filesystemfinal@gmail.com",
        pass: "ihaveapen"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('email.html');
});

app.post('/',function(req,res){
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req);
	var newpass = randomstring.generate({
		  length: 12,
		  charset: 'alphabetic'
		});
    var mailOptions={
        to : req.query.to,
        subject : 'TEstmail',
        text : 'Your new password is:' + newpass+'/n.'
    }
    console.log(mailOptions);
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

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});/**
 * 
 */