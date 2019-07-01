const { Before, Given, When, Then, After } = require('cucumber');
const assert = require('assert');

let root;

Given('I have an empty object', function () {
    root = {};
});

When('I set prop to {string}', function (string) {
    root.prop = string;
});

Then('I end up with object.prop of {string}', function (string) {
    assert.equal(root.prop, string);
});
