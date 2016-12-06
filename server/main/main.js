/**
 * Created by fortunato on 12/10/16.
 */
const modules = "../node_modules/";
const route = "./routes/";
var port = 8083;

var express = getModule('express');
var fs = require('fs');
var cacheLevel = require('../main/cacheLayer/cacheFirstLevel');
var service = express();
var verboseService = require('../main/verbose/verbosing');

var cache_minutes= "";
process.argv.forEach(function (val, index, array) {
    if(val.indexOf('port=') != -1) port = (val.replace('port=',''));
    if(val.indexOf('cache-minutes=') != -1) cache_minutes = (val.replace('cache-minutes=',''));
    if(val.indexOf('verbose-http-call') != -1) verboseService.setVerbose(true);
});

initRoute(service);

service.get('/', function(req, res){
    res.send('Guida Tv Social Welcome on Board!');
});

service.listen(port, function(){
    console.log("Started Service on port "+port);
});



function initRoute(service){
    fs.readdir(route, function(err, files){
        if(!err)
            files.forEach(x => getRoute(x.replace('.js',''))(service));
    });
    cacheLevel.startCaching(cache_minutes);
}

function getRoute(route_name){
    return require(route+route_name);
}
function getModule(module_name){
    return require(modules+module_name);
}

