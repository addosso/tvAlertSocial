/**
 * Created by fortunato on 12/10/16.
 */
const modules = "../node_modules/";
const route = "./routes/";
const port = 8083;

var express = getModule('express');
var fs = require('fs');
var service = express();

initRoute(service);

service.get('/', function(req, res){
    res.send('Hello World');
});

service.listen(port, function(){
    console.log("Started Service on port "+port);
});




function initRoute(service){
    fs.readdir(route, function(err, files){
        if(!err)
            files.forEach(x => getRoute(x.replace('.js',''))(service));
    });
}

function getRoute(route_name){
    return require(route+route_name);
}
function getModule(module_name){
    return require(modules+module_name);
}

