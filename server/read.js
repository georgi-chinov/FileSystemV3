/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
var http = require('http');


var connection = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'filesystemendproject'
});
connection.connect();

var query = connection.query( 'SELECT * FROM users', function (error, result) {
	if (error) {
		console.error(error);
		return;
	}
	console.error(result);
		
})
