/* global ss:true */
/** @module image */
'use strict';

var Quill = require('quill');
var helpers = require('./helpers');
var _ = require('lodash');

/**
 * Module that allows for image uploads.
 * @constructor
 * @param {object} quill - The QuillJS object.
 * @param {object} options - Configufation options.
 */
function QuillImage(quill, options) {
    var DEFAULTS = {
        handler: '/',
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif']
    };

    this.quill = quill;
    this.options = _.defaults(options, DEFAULTS);

    this.button = this.quill.modules.toolbar.container.querySelector('.ql-image');
    if(this.button) {
        this.initListeners();
    }
}

/**
 * Handler called when image upload is finished.
 * @private
 * @param  {String} filename - The filename of the uploaded image.
 * @param  {object} response - The server response.
 */
QuillImage.prototype.handleUploadComplete = function (filename, response) {
    if (!response || !response.url) {
        this.handleUploadFailed();
        return false;
    }

    // getSelection() does not work for some reason...
    this.quill.editor.checkUpdate();
    var currentSelection = this.quill.editor.selection.range;
    var cursorLocation = 0;
    if(currentSelection) {
        cursorLocation = currentSelection.start;
    }
    this.quill.insertEmbed(cursorLocation, 'image', response.url);
};

/**
 * Handler called if image upload failed. This will add the error message under
 * the toolbar.
 * @private
 */
QuillImage.prototype.handleUploadFailed = function () {
    var errorContainer = document.createElement('div');
    errorContainer.innerHTML = document.querySelector('#ql-image-error').innerHTML;
    this.quill.container.insertAdjacentHTML('beforebegin', errorContainer.innerHTML);
};

/**
 * Initializes the event listeners.
 * @private
 */
QuillImage.prototype.initListeners = function () {
    var csrfToken = helpers.getCookie(document.cookie, 'csrftoken');

    this.uploader = new ss.SimpleUpload({
        button: this.quill.modules.toolbar.container.querySelector('.ql-image'),
        url: this.options.handler,
        responseType: 'json',
        name: 'quillUploadFile',
        allowedExtensions: this.options.allowedExtensions,
        hoverClass: 'hover',
        customHeaders: {
            'X-CSRFToken': csrfToken
        },
        data: {
            csrfmiddlewaretoken: csrfToken
        },

        onComplete: _.bind(this.handleUploadComplete, this),
        onError: _.bind(this.handleUploadFailed, this)
    });

    document.addEventListener('click', function (e) {
        if(helpers.matches(e.target, '[data-dismiss="ql-image-alert"]')) {
            var alert = helpers.findClosestElement(e.target, '.ql-image-alert');
            alert.parentNode.removeChild(alert);
        }
    });
};

Quill.registerModule('image', QuillImage);
module.exports = QuillImage;
