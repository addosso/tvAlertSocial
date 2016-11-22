/**
 * Created by fortunato on 15/11/16.
 */
module.exports = routerMediaset;

const mediasetChannel = 'www.mediaset.it/guidatv/inc/canali';


var http = require('http');


function routerMediaset(express_instance) {

    express_instance.get('/mediaset', function (req, res) {

        var _self = this;
        http.request({
            host: mediasetChannel + '/201611/20161117_TG24.sjson'

        }, (res) => {
            let response = "";
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                _self.response(response);
            })

        })

    })


}