/**
 * Created by fortunato on 22/11/16.
 */
module.exports = orainOndaRouter;

var oraInOndaController = require('../controllers/oraInOndaController');
var cacheInOnda = require('../cacheLayer/cacheFirstLevel');

function orainOndaRouter(express_instance){

    /**
     * Approccio naive, è quello di crearmi una mappa di check di risposta e per ogni risposta che arriva
     * popolo con true la relativa scheda.
     * Quando tutte le schede sono true faccio partire la response dal server.
     * Problemi che posso incontrare sono il fatto che non tutte le response dei vari canali mi ritornino.
     * Che cosa faccio? Ritorno tutto quello che ho e gestisco gli errori?
     * Ci penseremo!
     **/

    express_instance.get('/oraInOnda', function(req,res) {

        var initDay = new Date();
        console.log('Metodo chiamato alle ', initDay);

        var responseObject = [];
        function sendMessage(data){
            res.send(data);
        }

        if(cacheInOnda.cacheObject() === null)
        oraInOndaController(responseObject,sendMessage);
        else
        sendMessage(cacheInOnda.cacheObject());

        var endDate = new Date();
        console.log('Metodo finito alle', endDate);



    });

}
