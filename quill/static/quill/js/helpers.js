/** @module helpers */
'use strict';

/**
 * Gets a cookie value.
 * @param {string} cookies - The semi-colon list of cookies (usually document.cookie).
 * @param {string} name - The cookie value to get
 * @returns {string} The cookie value, or null if it doesn't exist.
 */
function getCookie(cookies, name) {
    // Source: https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
    var cookieValue = null;
    if (cookies && cookies !== '') {
        var cookieList = cookies.split(';');
        for (var i = 0; i < cookieList.length; i++) {
            var cookie = cookieList[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * Checks to see if an element matches the selector.
 * @param  {HTMLElement} el - The DOM element to match.
 * @param  {string} selector - The CSS selector to use when matching.
 * @return {boolean} true if the element matches the selector, otherwise false.
 */
function matches(el, selector) {
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

/**
 * Finds the closes element that matches the given selector.
 * @param  {HTMLElement} el - The DOM element to start with.
 * @param  {String} selector - The CSS selector to use when matching.
 * @return {HTMLElement} The nearest DOM element matching the given selector.
 */
function findClosestElement(el, selector) {
    return el && (
        matches(el, selector) ? el : findClosestElement(el.parentNode, selector)
    );
}

module.exports.findClosestElement = findClosestElement;
module.exports.getCookie = getCookie;
module.exports.matches = matches;
