/**
 * Created by fortunato on 22/11/16.
 */
module.exports = routerMediasetPremium;

var mediasetPremiumController = require('../controllers/mediasetPremiumController')();

function routerMediasetPremium(express_instance) {

    express_instance.get('/mediasetpremium', function (req, res) {
        mediasetPremiumController.mediasetPremiumProgrammazione(req.query.day, req.query.canale, (data) => {
           res.send(data);
        });
    });

    express_instance.get('/mediasetpremium/fromnow', function (req, res) {
        mediasetPremiumController.mediasetPremiumFromNow(req.query.canale, (data) => {
            res.send(data);
        })
    });




}


