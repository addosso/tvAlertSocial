/**
 * Created by fortunato on 02/12/16.
 */
/**
  {
    "name": "rai1",
    "show": {
      "title": "Pacchi",
      "hashtag": "#lapoElkann",
      "starttime": 1234,
      "endtime": 1234
    }

 * @type {mediasetObjectifier}
 */
module.exports = mediasetObjectifier;

function mediasetObjectifier(canale,arr_or_element_to_objectify, additionalParams){

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