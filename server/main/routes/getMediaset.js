/**
 * Created by fortunato on 15/11/16.
 */
module.exports = routerMediaset;

var mediasetController = require('../controllers/mediasetController')();

function routerMediaset(express_instance) {

    express_instance.get('/mediaset', function (req, res) {

        try {
            var callback = function (data) {
                res.send(data);
            };
           mediasetController.mediasetProgrammazione(req.query.day, req.query.canale, callback);
        }catch(err){
            res.send(err);
        }

    });

    express_instance.get('/mediaset/fromnow', function (req, res) {
        try {
            var callback = function (data) {
                res.send(data);
            };
            mediasetController.fromNowMediaset(req.query.canale, callback);
        }
        catch(err){
            res.send(err);
        }

    });
}