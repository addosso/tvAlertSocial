/**
 * Created by fortunato on 02/12/16.
 */

module.exports = {

 cacheObject(){
    return cached_object;
},
    startCaching

};
var oraInOndaController = require('../controllers/oraInOndaController');
var cached_object = null;
function caching(data){
    cached_object  = data;
}
function startCaching(minutes){
    console.log('starting cache request');
    function startCache(){
        var responseObject = [];
        oraInOndaController(responseObject, caching);
    }

    startCache();
    var interval = setInterval(startCache, 60 * 1000 * (minutes || 5) );
    return function(){
     clearInterval(interval);
    };
}