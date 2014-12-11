'use strict';

var test = require('tape');
var QuillDjango = require('../quill-django.js');

test('QuillDjango constructor', function (t) {
    t.plan(3);

    t.throws(function () {
        new QuillDjango();
    });

    t.throws(function () {
        new QuillDjango('test');
    });

    t.throws(function () {
        new QuillDjango('test', '#test');
    });
});
