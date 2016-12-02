/**
 * Created by fortunato on 12/10/16.
 */

module.exports = routerRai;

var raiController = require('../controllers/raiController')();

function routerRai(express_instance){

    express_instance.get('/rai', function(req,res) {
        raiController.raiProgrmmazione(req.query.day, req.query.canale, (data) => {
            res.send(data);
        });
    });

    express_instance.get('/rai/fromnow', function(req,res) {
        raiController.raiFromNow(req.query.canale, (data) => {
            res.send(data);
        })
    })
}


