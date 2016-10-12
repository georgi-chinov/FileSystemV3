var mysql = require('mysql');
var nfo = require('./credentials.js');
var dbconn;

function connectDatabase() {
    if (!dbconn) {
        dbconn = mysql.createConnection({
            host: 'localhost',
            user: nfo.db_username,
            password: nfo.db_pass,
            database: nfo.db_name
        });
        dbconn.connect(function(err) {
            if (!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
                console.log(err);
            }
        });
    }
    return dbconn;
}
module.exports = connectDatabase();
