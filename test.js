var express= require('express');
var bodyParser = require('body-parser');
var app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    return next();
});
app.get('/', function(req,res){
	res.send('dafuq');
})

app.post('/', function(req, res){
	console.log(req.body.to);
	res.send('cool');
})

app.listen(3333, function() {
	console.log('running');
});