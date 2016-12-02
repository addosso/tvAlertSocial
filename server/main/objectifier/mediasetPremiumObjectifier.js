/**
 * Created by fortunato on 02/12/16.
 */

module.exports = mediasetPremiumObjectifier;

function mediasetPremiumObjectifier(canale,arr_or_element_to_objectify, additionalParams){

    var objectToReturn = {};
    objectToReturn.name = canale;
    if(additionalParams) {
        Object.key(additionalParams).map(key => {
            objectToReturn[key] = additionalParams[key];
        });
    }

    var showObject = {};
    showObject.title = arr_or_element_to_objectify.title;
    showObject.hashtag = "";
    showObject.starttime = "";
    showObject.endTime = "";

    objectToReturn.show = showObject;
    return objectToReturn;

}