/**
 * Created by nick.london on 14.02.2017.
 */

/**
 * Returns URL GET parameter value, or check it's existence.
 * @param sParam name of the URL GET parameter
 * @returns {String|boolean} Returns the value of the parameter or true if it has no value. Returns false if parameter does not exist.
 */
var getUrlParameter;
getUrlParameter = function getUrlParameter(sParam) {
    /*
    sPageURL {String} Decoded URI part after '&'.
    sURLVariables {Array} Array of parameter=value pairs.
    sParameterName {Array} Name of parameter at 0 and value at 1.
    i {Number} counter
     */
    var sPageURL;
    var sURLVariables;
    var sParameterName;
    var i;

    /*
    Retrieve URI Parameters and split into Array
     */
    sPageURL = decodeURIComponent(window.location.search.substring(1));
    sURLVariables = sPageURL.split('&');

    /*
    Loop through Parametes and look for queried parameter name
     */
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) return sParameterName[1] === undefined ? true : sParameterName[1];
    }

    return false;
};

