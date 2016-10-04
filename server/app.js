var nodemailer = require("nodemailer");
var express = require("express");
var app = express();
var routes = require('./routes');

// production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		message : err.message,
		error : {}
	});
});



app.listen(3000, function() {
	console.log("Express Started on Port 3000");
});