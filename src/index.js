var Tortoise = require('tortoise');
var tortoise = new Tortoise('amqp://jnbrbenadie-pc');

var EventStore = require('./inmemoryeventstore');
var imes = new EventStore();

var Repository = require('./repository');
var repo = new Repository();
repo.EventStore = imes;

var Processor = require('./commandprocessor');
var CommandProcessor = new Processor();
CommandProcessor.repo = repo;

tortoise
    .queue('iLoan')
    .prefetch(1)
    .json()  // Decodes message from JSON
    .subscribe(function (msg, ack, nack) {
        CommandProcessor.Process(msg);
        ack(); // or nack()
    });

/*
var m =
{
    "Id":"1",
    "Entity":"Company",
    "Message":"CompanyLegalNameChanged",
    "Version":"1",
    "Data":{
        "LegalName":"Company Legal Name"
    },
    "MetaData":{
        "LegalName":""
    }
}
*/