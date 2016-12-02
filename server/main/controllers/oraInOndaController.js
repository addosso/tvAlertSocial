/**
 * Created by fortunato on 02/12/16.
 */
/**
 * In vista di nuovi sviluppo come per esempio l'aggiornamento che viene pushato al client
 * faccio un controller anche per l'ora in onda in modo che posso fare il check
 * di eventuali cambiamenti dell'array delle dirette.
 * Come gestirlo dobbiamo parlarne. Sarei per implementare un sistema consistente di cache.
 * In modo da ridurre drasticamente le chiamate da fare ai servizi.
 */
module.exports = oraInOndaController;


var mediasetController = require('../controllers/mediasetController')();
var skyController = require('../controllers/skyController')();
var mediasetPremiumController = require('../controllers/mediasetPremiumController')();
var raiController = require('../controllers/raiController')();
var mediasetObjectifier = require('../objectifier/mediasetObjectifier');
var skyObjectifier = require('../objectifier/skyObjectifier');
var mediasetPremiumObjectifier = require('../objectifier/mediasetPremiumObjectifier');
var raiObjectifier = require('../objectifier/raiObjectifier');
var hashTagService = require('../externalServices/hashTagService');

function oraInOndaController(responseObject,callBackFinish){

    var objCheckResponse = {};
    populateCheckObjResponse(mediasetController.mappingCanali, objCheckResponse);
    populateCheckObjResponse(raiController.mappingCanali, objCheckResponse);
    populateCheckObjResponse(mediasetPremiumController.mappingCanali, objCheckResponse);
    populateCheckObjResponse(skyController.mappingCanali, objCheckResponse);

    function callBackHashTag(canale, data, hashtag){
        objCheckResponse[canale] = true;
        data.show.hashtag = hashtag || "";
        responseObject.push(data);
        if(checkAllTrue(objCheckResponse)) {
            console.log("ENTRATO");
            callBackFinish(responseObject);
        }
    }
    function callBackCheck(canale,objectifier,data){
        var obje = objectifier(data[0]);
        hashTagService.hashTagService(obje.show.title, callBackHashTag.bind(null, canale,obje));
    }

    response(mediasetController.fromNowMediaset, mediasetController.mappingCanali, callBackCheck, mediasetObjectifier);
    response(raiController.raiFromNow, raiController.mappingCanali, callBackCheck, raiObjectifier);
    response(mediasetPremiumController.mediasetPremiumFromNow, mediasetPremiumController.mappingCanali, callBackCheck, mediasetPremiumObjectifier);
    response(skyController.skyFromNow, skyController.mappingCanali, callBackCheck, skyObjectifier);


    function response(from_now_function, mapping_canali, callback, objectifier){
        Object.keys(mapping_canali).forEach(key =>{
            from_now_function(key, callback.bind(null, key, objectifier.bind(null,key)));
        })
    }
    function populateCheckObjResponse(mapping_canali, obj_response){
        Object.keys(mapping_canali).map(canale => {
            return obj_response[canale] = false;
        });
    }
    function checkAllTrue(obj_to_check){
        var toReturn = true;
        Object.keys(obj_to_check).forEach(key => {
            if(obj_to_check[key] === false) toReturn = false;
        });
        return toReturn;
    }
}