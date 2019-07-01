const { Before, Given, When, Then, After } = require('cucumber');
const assert = require('assert');
const domain = require('../../src/domain')
var entityDefinitions = (new domain()).classes;

// //SCENARIO :- 
// //  Assign a legal name to a company without a legal name
let aggregate;

var command = { "Id": "1", "Entity": "Company", "Method": "ChangeCompanyLegalName", "Version": "1", "Data": { "LegalName": "First Legal Name" } };

Given('A company without a legal name', function () {
    aggregate = new entityDefinitions["Company"](command.Id);
});

When('The legal name is assigned using the command {string}', function (string) {
    var command = JSON.parse(string);
    aggregate["ChangeCompanyLegalName"](command);
});

Then('The company legal name is updated to {string}', function (string) {
    assert.equal(aggregate.LegalName, string);
});

Then('A CompanyLegalNameChanged event {string} is added to the event stream', function (string) {
    event = JSON.parse(string);
    var events = new Array();
    events = aggregate.GetEvents();
    var idx = events.indexOf(event);
    assert.notEqual(idx, 0);
});
