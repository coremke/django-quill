/** @module quill-django */
'use strict';

require('./image');

var Quill = require('quill');
var helpers = require('./helpers');

/**
 * Creates a new django-quill WYSIWYG editor.
 * @constructor
 * @param {string} id - The ID of the field from the django form.
 * @param {string} editorSelector - The selector used to get the editor HTML.
 * @param {string} toolbarSelector - The selector used to get the toolbar HTML.
 * @param {string} imageModuleOpts - Options for the image module
 * @param {string} [theme=snow] - The theme that should be used.
 */
function QuillDjango(id, editorSelector, toolbarSelector, imageModuleOpts, theme) {
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
            'link-tooltip': true,
            'image': imageModuleOpts
        },
        theme: theme || 'snow'
    });
}

module.exports.QuillDjango = QuillDjango;
global.window.QuillDjango = QuillDjango;
