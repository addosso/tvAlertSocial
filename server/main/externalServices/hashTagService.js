/**
 * Created by fortunato on 02/12/16.
 */
module.exports = {
    hashTagService
};
const SERVER_URL = "146.185.164.203";
const SERVICE_PORT = "8081";
const SERVICE_URL = "/findhashtag";

var http = require('http');

function hashTagService(name, callback){
    console.log("cerco hashtag con"+name);

        var req = http.request({
            method: "POST",
            port: SERVICE_PORT,
            host: SERVER_URL,
            path: SERVICE_URL,
            headers :{
                'Content-Type': 'application/json'
            }
        }, res => {
            var _return = "";
            res.on('data', c => {
                _return += c;
            });
            res.on('end', end => {
                callback(_return);
            });

        });
        req.write(JSON.stringify({title: name}));
        req.on('error', err => {
            callback("");
        });
        req.end();

};