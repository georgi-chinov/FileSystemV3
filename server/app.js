var express = require("express");
var routes = require("./routes")
var app=express();

app.get('/',function(req, res) {
	res.send('hello there124443');
})
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    return next();
});

	
app.use('/', routes);

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});
