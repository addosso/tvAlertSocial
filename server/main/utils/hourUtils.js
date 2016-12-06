/**
 * Created by fortunato on 24/11/16.
 */

var hourUtils = {
    timeZone : 1.00,
    getDay(){
        var targetTime = new Date();
        var tzDifference = this.timeZone * 60 + targetTime.getTimezoneOffset();
        var now = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
        return ((now.getDate()+'').length == 1? '0'+now.getDate(): now.getDate())+'/'+(now.getMonth()+1)+'/'+now.getFullYear();
    },
    getHour(){
        var targetTime = new Date();
        var tzDifference = this.timeZone * 60 + targetTime.getTimezoneOffset();
        var now = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
        return ((now.getHours()+'').length ==1? '0'+now.getHours(): now.getHours())+':'+
            ((now.getMinutes()+'').length ==1? '0'+now.getHours() : now.getHours());
    }

};

module.exports = hourUtils;
