var express = require("express");
var multer = require("multer");
var session = require("express-session");
var bodyParser = require("body-parser");
var routes = require("./routes");
var nfo = require('./credentials.js');
var app = express();

//Middeware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});
app.use(multer({
    dest: './uploads/',
    rename: function(fieldname, filename) {
        return fieldname + filename + Date.now();
    }
}).single('file'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))
app.use('/', routes);
app.listen(3000, function() {
    console.log("Express Started on Port 3000");
});
