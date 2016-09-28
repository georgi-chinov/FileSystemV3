/**
 * 
 */

/*var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express();

app.post('../NewFile.html',function(request, responce){
	var file = request.upload;
	console.log(file);
});*/
var mysql = require('mysql');
var connection = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'filesystemendproject'
});
connection.connect();

var user =  {
		username: 'Qnko',
		password: 'test123'
};

var query = connection.query( 'INSERT INTO users SET ?', user, function (error, result) {
	if (error) {
		console.error(error);
		return;
	}
	console.error(result);
		
})