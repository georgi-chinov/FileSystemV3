var express = require("express");
var multer = require("multer");
var bodyParser = require("body-parser");
var routes = require("./routes");
var nfo = require('./credentials.js');
var app = express();
var sessionOptions = {
        secret: nfo.secret,
        resave: nfo.resave,
        saveUninitialized: nfo.saveUninitialized,
        cookie: {
            secure: false,
            maxAge: 60000
        }
    }
    //Middeware
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    return next();
});
app.use(multer({
    dest: './uploads/'
}).single('file'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', routes);
app.listen(3000, function() {
    console.log("Express Started on Port 3000");
});
