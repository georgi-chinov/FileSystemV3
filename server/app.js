var express = require("express");
var app=express();

app.get('/',function(req, res) {
	res.send('hello there123');
})

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});
