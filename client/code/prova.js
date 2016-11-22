/**
 * Created by fortunato on 14/11/16.
 */

PROVA = function () {

    var settings = {};

    function init() {
        $.getJSON("xhr/prova2.json").then(function (data) {
            settings = data;
        });

    };


    return {
        init: init,
        getSettings: function () {
            return settings
        }
    }
}();