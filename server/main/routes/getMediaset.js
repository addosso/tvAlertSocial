/**
 * Created by fortunato on 15/11/16.
 */
module.exports = routerMediaset;

const mediasetChannel = 'www.mediaset.it';

const mappingCanali = {
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


function routerMediaset(express_instance) {

    express_instance.get('/mediaset', function (req, res) {

        var _self = this;
        this.res = res;
        http.request({
            host: mediasetChannel,
            method: 'GET',
            path: '/guidatv/inc/canali'+ createQueryString({
              giorno: req.query.day,
              canale: req.query.canale
            })

        }, (res) => {

            let response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                _self.res.send(JSON.parse(response));
            })

        }).end();




    });

    express_instance.get('/mediaset/fromnow', function (req, res) {

        var _self = this;
        this.res = res;
        http.request({
            host: mediasetChannel,
            method: 'GET',
            path: '/guidatv/inc/canali'+ createQueryString({
                giorno: hourUtils.getDay(),
                canale: req.query.canale
            })

        }, (res) => {

            let response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                response = JSON.parse(response);
                let eventsArray = [];
                response.events.map(program => {
                    if(program.startTime > hourUtils.getHour()) eventsArray.push(program);
                });
                _self.res.send(eventsArray);
            })

        }).end();




    });



    function createQueryString(request_obj){
        var dayArray = request_obj.giorno.split('/');
        if(dayArray.length < 3) throw "errore nel giorno";

        var mese = '/'+dayArray[2]+dayArray[1]+'/';
        var allDayAndChannel = dayArray[2]+''+dayArray[1]+''+dayArray[0]+'_'+mappingCanali[request_obj.canale]+'.sjson';
        return mese+allDayAndChannel;
    }


}