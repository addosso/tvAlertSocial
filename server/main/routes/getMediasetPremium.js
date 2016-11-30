/**
 * Created by fortunato on 22/11/16.
 */
module.exports = routerMediasetPremium;

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


function routerMediasetPremium(express_instance) {

    express_instance.get('/mediasetpremium', function (req, res) {

        var _self = this;
        this.res = res;
        http.request({
            host: mediasetChannel,
            method: 'GET',
            path: '/guida_tv/json'+ createQueryString({
                giorno: req.query.day,
                canale: req.query.canale
            })

        }, (res) => {

            let response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                var showToReturn = [];
                JSON.parse(response).shows.map(el => {
                    showToReturn.push(el);
                });
                _self.res.send(showToReturn);
            })
        }).end();
    });

    express_instance.get('/mediasetpremium/fromnow', function (req, res) {

        var _self = this;
        this.res = res;
        http.request({
            host: mediasetChannel,
            method: 'GET',
            path: '/guida_tv/json'+ createQueryString({
                giorno: hourUtils.getDay(),
                canale: req.query.canale
            })

        }, (res) => {

            let response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                var showToReturn = [];
                  JSON.parse(response).shows.map( event => {
                     if(_getHourMinutesFromEpoc(event.timeStart) > hourUtils.getHour()) {
                        event.timeStart = _getHourMinutesFromEpoc(event.timeStart);
                        event.timeEnd = _getHourMinutesFromEpoc(event.timeEnd);
                        showToReturn.push(event);
                    }
                });
                _self.res.send(showToReturn);
            })
        }).end();
    });



    function _paddingHour(toPad, padding){
       return (padding+toPad).substring(toPad.length,(padding+toPad).length);
    }
    function _getHourMinutesFromEpoc(epoc){
        var date = new Date();
        date.setUTCSeconds(epoc);
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
}


