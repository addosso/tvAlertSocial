/**
 * Created by fortunato on 12/10/16.
 */

module.exports = routerRai;

const raiUrl = "www.raiplay.it";


var http = require('http');
var cheerio = require('../../node_modules/cheerio');
var hourUtils = require('../utils/hourUtils');

function routerRai(express_instance){

    express_instance.get('/rai', function(req,res) {

        var _self = this;
        this.res = res;

        http.request({
            host: raiUrl,
            path: '/guidatv/index.html' + createQueryString({
                canale: req.query.canale,
                giorno: req.query.day.replace(new RegExp('/', 'g'),'-')
            })
        }, (res) => {
            res.setEncoding('utf8');
            var html_to_analize="";
            res.on('data', function(chunk){
                html_to_analize +=chunk;
            });
            res.on('end', function(){
               var $ =  cheerio.load(html_to_analize);
                var orarioArray = $('.ora').text();
                var response = {};
                for(let i = 0,index =0; i<orarioArray.length;i+=5, index++){
                    response[index] = {
                        'orario': orarioArray.substring(i, i+5),
                        'titolo':  $($('.info')[index]).text()
                    }
                }

                _self.res.send(response);
            })
    }).end();
    });

    express_instance.get('/rai/fromnow', function(req,res) {

        var _self = this;
        this.res = res;
        http.request({
            host: raiUrl,
            path: '/guidatv/index.html' + createQueryString({
                canale: req.query.canale,
                giorno: hourUtils.getDay().replace(new RegExp('/', 'g'),'-')
            })
        }, (res) => {
            res.setEncoding('utf8');
            var html_to_analize="";
            res.on('data', function(chunk){
                html_to_analize +=chunk;
            });
            res.on('end', function(){
                var $ =  cheerio.load(html_to_analize);
                var orarioArray = $('.ora').text();
                var response = {};
                for(let i = 0,index =0; i<orarioArray.length;i+=5, index++){
                    response[index] = {
                        'orario': orarioArray.substring(i, i+5),
                        'titolo':  $($('.info')[index]).text()
                    }
                }
                var toReturnArray = [];
                Object.keys(response).map( el => {
                    if(response[el].orario > hourUtils.getHour()) toReturnArray.push(response[el]);
                });

                _self.res.send(toReturnArray);
            })
        }).end();


    })
}


function createQueryString(query_string_obj) {
    function* generator(object){
        for(let key of Object.keys(object)){
            yield [key, object[key]];
        }
    }
    var string = "";
    for(let [key, value] of generator(query_string_obj) ){
        string += key+"="+value+"&";
    }
    return "?"+ string.substring(0, string.length-1);
}