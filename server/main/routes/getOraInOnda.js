/**
 * Created by fortunato on 22/11/16.
 */
module.exports = orainOndaRouter;

const urlMappingRequest =[
    {
        host: "www.raiplay.it",
        path: '/dl/palinsesti/oraInOnda.json'
    },

];


var http = require('http');

function orainOndaRouter(express_instance){

    express_instance.get('/oraInOnda', function(req,res) {

        this.obj_to_ret = {};
        this.urlMappingIndex = urlMappingRequest.length;
        var _self = this;
        this.res = res;
        urlMappingRequest.forEach((value_obj) => {
            http.request(
               value_obj
            , (res) => {
                var toRet = "";
                res.on('data', function(chunk){
                    toRet += chunk;
                });
                res.on('end', function(){

                    _self.obj_to_ret[value_obj.host] = JSON.parse(toRet);
                    _self.urlMappingIndex--;
                    if(_self.urlMappingIndex == 0) _self.res.send(_self.obj_to_ret);
                });
            }).end();
        });





    })
}
