/**
 * Created by fortunato on 03/12/16.
 */
module.exports = {
  verbose : _verbose,
  setVerbose : function(p){
        _verbose = p;
    }
};
var _verbose = false;