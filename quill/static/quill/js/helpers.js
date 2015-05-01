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
 * Finds the closest element that matches the given selector.
 * @param  {HTMLElement} el - The DOM element to start with.
 * @param  {String} selector - The CSS selector to use when matching.
 * @return {HTMLElement} The nearest DOM element matching the given selector.
 */
function findClosestElement(el, selector) {
    return el && (
        matches(el, selector) ? el : findClosestElement(el.parentNode, selector)
    );
}

/**
 * Adds a class name to an element.
 * @param {HTMLElement} el - The element to add the class to.
 * @param {string} className - The class to add.
 */
function addClass(el, className) {
    if(el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}

/**
 * Removes a class from and element.
 * @param  {HTMLElement} el - The element to remove the class from
 * @param  {string} className - The class to remove
 */
function removeClass(el, className) {
    if(el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

module.exports.addClass = addClass;
module.exports.findClosestElement = findClosestElement;
module.exports.getCookie = getCookie;
module.exports.matches = matches;
module.exports.removeClass = removeClass;
