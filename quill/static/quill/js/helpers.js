'use strict';

function matches(el, selector) {
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

function findClosestElement(el, selector) {
    return el && (
        matches(el, selector) ? el : findClosestElement(el.parentNode, selector)
    );
}

module.exports.matches = matches;
module.exports.findClosestElement = findClosestElement;
