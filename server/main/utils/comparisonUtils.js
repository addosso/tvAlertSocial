/**
 * Created by fortunato on 26/11/16.
 */

var comparisonUtils = {

    putInsideInStreaming(total_array, from_now_array) {
        if(total_array.length <= from_now_array.length) return;
        var indexToPutIn = total_array.length - from_now_array.length - 1;
        from_now_array.unshift(total_array[indexToPutIn]);
    }
};

module.exports = comparisonUtils;