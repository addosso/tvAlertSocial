/**
 * Created by fortunato on 01/12/16.
 */
/**
 * JSON di risposta per mediasetPremium
 * {
    "id": 604,
    "title": "LA MALEDIZIONE DELLO SCORPIONE DI GIADA",
    "parentalControl": 1,
    "timeStart": "16:53",
    "timeEnd": "18:52",
    "linkDetail": "http://www.mediasetpremium.it/guidatv/cinema/la-maledizione-dello-scorpione-di-giada_F010948001000102.html"
  }
 * @type {mediasetPremiumController}
 */
module.exports = mediasetPremiumController;
const mediasetChannel = 'www.mediasetpremium.it';

const mappingCanali = {
    "cinemahd" : 'KE',
    "cinema24": 'LX',
    "cinema2hd": "LM",
    'cinema224' : "LW",
    'cinemahdenergy': "KG",
    'cinema24energy': "LQ",
    'cinemaemotion': "KO",
    'cinemacomedy': "LC",
    'studiouniversal': "KR",
    'actionhd' : "KS",
    'action24' : "LU",
    'crimehd' : "LR",
    'crime24' : "LZ",
    'stories' : "KD",
    'stories24' : "LE",
    'joi' : "KJ",
    'joi24': "LD",
    'investigationdiscovery':"EH",
    'sporthd' : "LV",
    'sport2hd' : "KC",
    'eurosport' : "EE",
    'eurosport2': "EF",
    'cartoonnetwork' : "KN"
};

var http = require('http');
var hourUtils = require('../utils/hourUtils');
var comparisonUtil = require('../utils/comparisonUtils');

function mediasetPremiumController(){

    function mediasetPremiumFromNow(canale, callback){

        console.log("CHIAMATO MEDIASET PREMIUM ", canale);
        return http.request({
            host: mediasetChannel,
            method: 'GET',
            path: '/guida_tv/json'+ createQueryString({
                giorno: hourUtils.getDay(),
                canale: canale
            })

        }, (res) => {

            var response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                var showToReturn = [];
                var toEnd = false;
                var totalArray =  JSON.parse(response).shows.map( event => {
                    event.timeStart = _getHourMinutesFromUnixEpoc(event.timeStart);
                    event.timeEnd = _getHourMinutesFromUnixEpoc(event.timeEnd);
                    if(toEnd) showToReturn.push(event);
                    if(event.timeStart > hourUtils.getHour() && !toEnd ) {
                        toEnd = true;
                        showToReturn.push(event);
                    }
                    return event;
                });
                comparisonUtil.putInsideInStreaming(totalArray, showToReturn);
                callback(showToReturn);
            })
        }).end();
    }
    function mediasetPremiumProgrammazione(day, canale, callback){
        return http.request({
            host: mediasetChannel,
            method: 'GET',
            path: '/guida_tv/json'+ createQueryString({
                giorno: day,
                canale: canale
            })

        }, (res) => {

            var response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                var showToReturn = [];
                JSON.parse(response).shows.map(el => {
                    showToReturn.push(el);
                });
               callback(showToReturn);
            })
        }).end();
    }





    function _paddingHour(toPad, padding){
        return (padding+toPad).substring(toPad.length,(padding+toPad).length);
    }
    function _getHourMinutesFromUnixEpoc(epoc){
        const epocMul = 1000;
        var date = new Date(epoc*epocMul);
        return _paddingHour(date.getHours()+'','00')+':'+_paddingHour(date.getMinutes()+'', '00');
    }

    function createQueryString(request_obj){
        var dayArray = request_obj.giorno.split('/');
        if(dayArray.length < 3) throw "errore nel giorno";
        var giornoCost = dayArray[2]+dayArray[1]+dayArray[0];
        var mese = '/'+giornoCost+'/';
        var allDayAndChannel = giornoCost+'-'+mappingCanali[request_obj.canale]+'.json';
        return mese+allDayAndChannel;
    }
    return {
        mediasetPremiumProgrammazione,
        mediasetPremiumFromNow,
        mappingCanali
    }

}