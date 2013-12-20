
/**
 * Module dependencies.
 */

var express = require("express");
var http = require("http");
var path = require("path");
var fs = require("fs");
var app = express();
// all environments
app.set("port", 8080);
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use("/", express.static(__dirname));

app.get("/", function(req, res){
    res.sendfile("index.html");
});

http.createServer(app).listen(app.get("port"), function(){
    console.log("Express server listening on port " + app.get("port"));
});