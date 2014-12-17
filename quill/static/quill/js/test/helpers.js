'use strict';

var test = require('tape');
var helpers = require('../helpers');

test('matches()', function (t) {
    t.plan(4);

    var element = document.createElement('p');
    element.setAttribute('id', 'test-id');
    helpers.addClass(element, 'js-test');

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

test('getCookie()', function (t) {
    t.plan(5);

    var testCookies = 'test=testing;test2=testing2;test3=testing3';
    t.equal(helpers.getCookie(testCookies, 'test'), 'testing');
    t.equal(helpers.getCookie(testCookies + ';test=DUPLICATE', 'test'), 'testing');
    t.notOk(helpers.getCookie(testCookies, 'testing1234'));
    t.notOk(helpers.getCookie(testCookies, 'tes'));
    t.notOk(helpers.getCookie('', 'test'));
});

test('addClass()', function (t) {
    t.plan(1);

    var testElement = document.createElement('div');
    helpers.addClass(testElement, 'test-class');
    t.equal(testElement.getAttribute('class').trim(), 'test-class');
});

test('removeClass()', function (t) {
    t.plan(2);

    var testElement = document.createElement('div');
    helpers.addClass(testElement, 'test-class');

    helpers.removeClass(testElement, 'test');
    t.equal(testElement.getAttribute('class').trim(), 'test-class');

    helpers.removeClass(testElement, 'test-class');
    t.notOk(testElement.getAttribute('class'));
});
