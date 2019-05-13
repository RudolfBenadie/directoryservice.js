const { Before, Given, When, Then } = require('cucumber');
const assert = require('../../node_modules/assert');

let root;

Given('I have an empty object', function () {
    root = {};
});

When('I set prop to {string}', function (string) {
    root.prop = string;
});

Then('I end up with object.prop of {string}', function (string) {
    console.log(root.prop);
    assert.equal(root.prop, string);
});
