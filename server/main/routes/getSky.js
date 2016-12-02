/**
 * Created by fortunato on 22/11/16.
 */
module.exports = routerSky;

var skyController = require('../controllers/skyController')();
function routerSky(express_instance) {

    express_instance.get('/sky', function (req, res) {
      skyController.skyProgrammazione(req.query.day, req.query.canale, (data) => {
          res.send(data);
      })
    });

    express_instance.get('/sky/fromnow', (req, res) => {
        skyController.skyFromNow(req.query.canale, (data) => {
            res.send(data);
        })
    });






}


