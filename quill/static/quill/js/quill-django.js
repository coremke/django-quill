'use strict';

var Quill = require('quill');
var helpers = require('./helpers');

function QuillDjango(id, editorSelector, toolbarSelector, theme) {
    if(id === undefined) {
        throw new Error('Missing editor ID.');
    }

    if(editorSelector === undefined) {
        throw new Error('Missing editor selector.');
    }

    if(toolbarSelector === undefined) {
        throw new Error('Missing toolbar selector.');
    }

    editorSelector = '[data-id="' + id + '"]' + editorSelector;
    toolbarSelector = '[data-id="' + id + '"]' + toolbarSelector;

    // Remove overflow from parent row
    var formRow = helpers.findClosestElement(document.querySelector(editorSelector), '.form-row');
    if(formRow) {
        formRow.style.overflow = 'visible';
    }

    this.id = id;
    this.quill = new Quill(editorSelector, {
        modules: {
            'toolbar': {container: toolbarSelector},
            'link-tooltip': true
        },
        theme: theme
    });
}

module.exports.QuillDjango = QuillDjango;
global.window.QuillDjango = QuillDjango;
