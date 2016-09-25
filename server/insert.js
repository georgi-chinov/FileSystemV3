/**
 * 
 */
var mysql = require('mysql');

var connection = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'filesystemendproject'
});
connection.connect();

var user =  {
		username: 'Hello',
		password: 'test123'
};

var query = connection.query( 'INSERT INTO users SET ?', user, function (error, result) {
	if (error) {
		console.error(error);
		return;
	}
	console.error(result);
		
})
