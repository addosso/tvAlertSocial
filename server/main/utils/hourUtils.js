/**
 * Created by fortunato on 24/11/16.
 */


module.exports = hourUtils();



function hourUtils(){

    function getDay(){
        let now = new Date();
        return now.getDate()+'/'+(now.getMonth()+1)+'/'+now.getFullYear();
    }

    function getHour(){
        let now = new Date();
        return now.getHours()+':'+now.getMinutes();
    }


    return {
        getDay,
        getHour



    }


}