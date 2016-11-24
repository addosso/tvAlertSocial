/**
 * Created by fortunato on 22/11/16.
 */
module.exports = routerSky;

const skyChannel = 'guidatv.sky.it';

const mappingCanali = {
 
"AXNHD":"ch_8455",
"AXNSci-Fi":"ch_6503",
"AnimalPlanet":"ch_519",
"AutomotoTV":"ch_7587",
"BabyTV":"ch_6160",
"Boomerang":"ch_472",
"CICrime+InvestigationHD":"ch_8336",
"CartoonNetwork":"ch_129",
"CieloHD":"ch_8133",
"ClassicaHD":"ch_8007",
"ComedyCentral":"ch_318",
"DeAJunior":"ch_7427",
"DeAKids":"ch_460",
"DiscoveryChannelHD":"ch_931",
"DiscoveryScienceHD":"ch_467",
"DiscoveryTravel&LivingHD":"ch_465",
"DisneyChannelHD":"ch_118",
"DisneyJunior":"ch_453",
"DisneyXDHD":"ch_131",
"Dove":"ch_6360",
"Eurosport2HD":"ch_391",
"EurosportHD":"ch_307",
"FoxAnimationHD":"ch_8853",
"FoxComedyHD":"ch_8833",
"FoxCrimeHD":"ch_139",
"FoxHD":"ch_122",
"FoxLifeHD":"ch_133",
"FoxSportsHD":"ch_8027",
"GamberoRossoHD":"ch_524",
"HipHopTV":"ch_309",
"HistoryChannelHD":"ch_639",
"K2":"ch_6240",
"La3":"ch_6400",
"Lei":"ch_423",
"MAN-GA":"ch_6440",
"MTVHD":"ch_9196",
"MTVHits":"ch_543",
"MTVMusic":"ch_528",
"MTVRocks":"ch_542",
"MyDeejay":"ch_462",
"NatGeoPeopleHD":"ch_7407",
"NatGeoWildHD":"ch_126",
"NationalGeoHD":"ch_641",
"NickJunior":"ch_461",
"Nickelodeon":"ch_320",
"Primafila1":"ch_7667",
"RealTimeHD":"ch_522",
"RockTV":"ch_333",
"Sky3D-Ch150":"ch_6761",
"SkyArteHD":"ch_8193",
"SkyAtlanticHD":"ch_8456",
"SkyCinemaClassicsHD":"ch_723",
"SkyCinemaComedyHD":"ch_6561",
"SkyCinemaCultHD":"ch_6141",
"SkyCinemaFamilyHD":"ch_105",
"SkyCinemaHitsHD":"ch_724",
"SkyCinemaMaxHD":"ch_115",
"SkyCinemaPassionHD":"ch_6581",
"SkyCinemaUnoHD":"ch_101",
"SkySport24HD":"ch_929",
"SkySport1HD":"ch_8714",
"SkySport2HD":"ch_7507",
"SkySport3HD":"ch_8693",
"SkySportF1HD":"ch_8413",
"SkySportMixHD":"ch_9433",
"SkySportMotoGPHD":"ch_8434",
"SkySportPlusHD":"ch_8753",
"SkySupercalcioHD":"ch_8673",
"SkyTG24HD":"ch_362",
"SkyUnoHD":"ch_718",
"Super!":"ch_6460",
"TV8":"ch_8195"
};

var http = require('http');
var hourUtils = require('../utils/hourUtils');

function routerSky(express_instance) {

    express_instance.get('/sky', function (req, res) {

        var _self = this;
        this.res = res;
        http.request({
            host: skyChannel,
            method: 'GET',
            path: '/app/guidatv/contenuti/data/grid'+ createQueryString({
                giorno: req.query.day,
                canale: req.query.canale
            })

        }, (res) => {

            let response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                _self.res.send(response);
            })

        }).end();


    });

    express_instance.get('/sky/fromnow', (req, res) => {


        var _self = this;
        this.res = res;
        http.request({
            host: skyChannel,
            method: 'GET',
            path: '/app/guidatv/contenuti/data/grid'+ createQueryString({
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
                let from_now = [];
                response.plan.map(act => {
                    if(act.starttime > hourUtils.getHour())
                    from_now.push(act);
                });
                _self.res.send(from_now);
            })

        }).end();



    });





    function createQueryString(request_obj){
        var dayArray = request_obj.giorno.split('/');
        if(dayArray.length < 3) throw "errore nel giorno";
        var year = dayArray[2].substring(2,4);
        var giornoCost = '/'+year+'_'+dayArray[1]+'_'+dayArray[0]+'/';
        var fileName = mappingCanali[request_obj.canale]+'.js';
        return giornoCost+fileName;
    }
}


