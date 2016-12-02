/**
 * Created by fortunato on 24/11/16.
 */

var hourUtils = {

    getDay(){
        var now = new Date();
        return ((now.getDate()+'').length == 1? '0'+now.getDate(): now.getDate())+'/'+(now.getMonth()+1)+'/'+now.getFullYear();
    },
    getHour(){
        var now = new Date();
        return ((now.getHours()+'').length ==1? '0'+now.getHours(): now.getHours())+':'+
            ((now.getMinutes()+'').length ==1? '0'+now.getHours() : now.getHours());
    }

};

module.exports = hourUtils;
