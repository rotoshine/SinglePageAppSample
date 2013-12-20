
/**
 * Module dependencies.
 */

var express = require("express");
var http = require("http");
var path = require("path");
var fs = require("fs");
var glob = require("glob");
var _ = require("underscore");
var app = express();
// all environments
app.set("port", 8080);
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use("/", express.static(__dirname));

glob("./routes/*.js", function(err, files){
    if(err){
        console.error(err);
    }else{
        _.each(files, function(routeFile){
            var router = require(routeFile);
            if(router && router.load){
                require(routeFile).load(app);
                console.log(routeFile + " load..");
            }
        });
        http.createServer(app).listen(app.get("port"), function(){
            console.log("Express server listening on port " + app.get("port"));
        });
    }
});
