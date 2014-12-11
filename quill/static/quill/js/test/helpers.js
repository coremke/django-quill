'use strict';

var test = require('tape');
var helpers = require('../helpers');

test('matches()', function (t) {
    t.plan(4);

    var element = document.createElement('p');
    element.setAttribute('id', 'test-id');
    if(element.classList) {
        element.classList.add('js-test');
    } else {
        element.className += ' ' + 'js-test';
    }

    t.ok(helpers.matches(element, '#test-id'), 'expected element to match #test-id');
    t.ok(!helpers.matches(element, '#invalid'), 'expected element to not match #invalid');

    t.ok(helpers.matches(element, '.js-test'), 'expected element to match .js-test');
    t.ok(!helpers.matches(element, '.js-invalid'), 'expected element to not match .js-invalid');
});

test('findClosestElement()', function (t) {
    t.plan(3);
    var parent = document.createElement('div');
    parent.setAttribute('id', 'test-id');

    var child = document.createElement('div');
    child.setAttribute('id', 'nested-id');
    parent.appendChild(child);

    var deeplyNested = document.createElement('p');
    child.appendChild(deeplyNested);

    t.ok(helpers.findClosestElement(child, '#test-id').getAttribute('id'), 'test-id', 'expected closest ID to be #test-id');
    t.ok(helpers.findClosestElement(deeplyNested, '#test-id').getAttribute('id'), 'test-id', 'expected closest ID to be #test-id');
    t.ok(helpers.findClosestElement(deeplyNested, 'div').getAttribute('id'), 'nested-id', 'expected closest ID to be #nested-id');
});
