/**
 * Created by fortunato on 01/12/16.
 */

/**
 *
 * Devo mettere il tipo di risposta di mediaset in modo tale che mi ricordo
 * come e quando devo parsarmela!!!
 *
 * {
    "codiceProgramma": "F307782701006501",
    "channel": "C5",
    "displayTitle": "POMERIGGIO CINQUE -",
    "title": "POMERIGGIO CINQUE",
    "description": "RUBRICA DI ATTUALITA' 120' - Italia, 2016",
    "genere": "ATTUALITA'",
    "sottogenere": "RUBRICA DI ATTUALITA'",
    "startTime": "17:10",
    "endTime": "18:45",
    "duration": "95"
  }
 *
 *
 * @type {mediasetController}
 */
module.exports = mediasetController;

const MEDIASET_CHANNEL ='www.mediaset.it';

const mappingCanali = {
    "canale5": 'C5',
    "rete4" : 'R4',
    "italia2": 'I2',
    "italia1": "I1",
    'la5' : "KA",
    'extra': "KQ",
    'topcrime': "LT",
    'iris': "KI",
    'tgcom24': "TG24"
};

var http = require('http');
var hourUtils = require('../utils/hourUtils');
var comparisonUtil = require('../utils/comparisonUtils');

function mediasetController(){

    function mediasetProgrammazione(day, canale, callback) {
       return  http.request({
            host: MEDIASET_CHANNEL,
            method: 'GET',
            path: '/guidatv/inc/canali' + createQueryString({
                giorno: day,
                canale: canale
            })

        }, (res) => {

            var response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                callback(JSON.parse(response));
            });

        }).end();
    }

    function fromNowMediaset(canale, callback){

        console.log("CHIAMATO MEDIASET", canale);
        return http.request({
            host: MEDIASET_CHANNEL,
            method: 'GET',
            path: '/guidatv/inc/canali'+ createQueryString({
                giorno: hourUtils.getDay(),
                canale: canale
            })

        }, (res) => {

            var response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {

                response = JSON.parse(response);
                var nowArray = [];
                var toEnd = false;
                var totalArray = response.events.map(program => {
                    if(toEnd) nowArray.push(program);
                    if(program.startTime > hourUtils.getHour() && !toEnd){
                        toEnd = true;
                        nowArray.push(program);
                    }
                    return program;
                });

                comparisonUtil.putInsideInStreaming(totalArray, nowArray);
                callback(nowArray);
            })

        }).end();
    }



    function createQueryString(request_obj){
        var dayArray = request_obj.giorno.split('/');
        if(dayArray.length < 3) throw "errore nel giorno";
        var mese = '/'+dayArray[2]+dayArray[1]+'/';
        var allDayAndChannel = dayArray[2]+''+dayArray[1]+''+dayArray[0]+'_'+mappingCanali[request_obj.canale]+'.sjson';
        return mese+allDayAndChannel;
    }


    return {
        mediasetProgrammazione,
        fromNowMediaset,
        mappingCanali
    }
}