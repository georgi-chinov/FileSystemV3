/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
var express = require('express');
var app = express();


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