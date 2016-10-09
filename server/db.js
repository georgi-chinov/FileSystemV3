require ('credentials.js');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : db_username,
  password : db_pass,
  database : db_name
});
 
connection.connect();
 	