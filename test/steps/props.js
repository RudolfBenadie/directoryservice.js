const { Before, Given, When, Then, After } = require('cucumber');
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


// //SCENARIO :- 
// //  Assign a legal name to a company without a legal name

Given('A company without a legal name', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('The legal name is assigned', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('The company legal name is updated', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('A CompanyLegalNameChanged event is added to the event stream', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
