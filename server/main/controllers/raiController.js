/**
 * Created by fortunato on 01/12/16.
 */
/**
 * Di seguito il JSon di risposta che mi ritorna la RAI
 * è molto scarsetto ma migliorabile parsandosi meglio l'html di risposta
 * tutto homeMADE :)))))
 *
 {
    "orario": "18:15",
    "titolo": "TG 2"
  }
 * @type {raiController}
 */
module.exports = raiController;

const raiUrl = "www.raiplay.it";

const mappingCanali = {
    'Rai1': 'Rai1',
    'Rai2': 'Rai2',
    'Rai3': 'Rai3',
    'Rai4': 'Rai4',
    'Rai5': 'Rai5',
    'RaiMovie': 'RaiMovie',
    'RaiPremium': 'RaiPremium',
    'RaiYoyo': 'RaiYoyo',
    'RaiGulp': 'RaiGulp',
    'RaiStoria': 'RaiStoria',
    'RaiScuola': 'RaiScuola',
    'RaiNews24': 'RaiNews24',
    'RaiSport1': 'RaiSport1',
    'RaiSport2': 'RaiSport2'
};

var http = require('http');
var cheerio = require('../../node_modules/cheerio');
var hourUtils = require('../utils/hourUtils');
var comparisonUtil = require('../utils/comparisonUtils');

function raiController(){

    function raiProgrmmazione(day, canale, callback){
        return http.request({
            host: raiUrl,
            path: '/guidatv/index.html' + createQueryString({
                canale: canale,
                giorno: day.replace(new RegExp('/', 'g'),'-')
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
                for(var i = 0,index =0; i<orarioArray.length;i+=5, index++){
                    response[index] = {
                        'orario': orarioArray.substring(i, i+5),
                        'titolo':  $($('.info')[index]).text()
                    }
                }

                callback(response);
            })
        }).end();
    }

    function raiFromNow(canale, callback){

        console.log("CHIAMATO RAI ", canale);
        return http.request({
            host: raiUrl,
            path: '/guidatv/index.html' + createQueryString({
                canale: canale,
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
                for(var i = 0,index =0; i<orarioArray.length;i+=5, index++){
                    response[index] = {
                        'orario': orarioArray.substring(i, i+5),
                        'titolo':  $($('.info')[index]).text()
                    }
                }
                var toReturnArray = [];
                var toEnd = false;
                var totalArray = Object.keys(response).map( el => {
                    if(toEnd) toReturnArray.push(response[el]);
                    if(response[el].orario > hourUtils.getHour() && !toEnd){
                        toReturnArray.push(response[el]);
                        toEnd = true;
                    }
                    return response[el];
                });
                comparisonUtil.putInsideInStreaming(totalArray, toReturnArray);
                callback(toReturnArray);
            })
        }).end();

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


    return {
        raiProgrmmazione,
        raiFromNow,
        mappingCanali
    }
}