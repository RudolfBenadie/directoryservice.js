var Tortoise = require('tortoise');
var tortoise = new Tortoise('amqp://localhost');

var EventStore = require('./pgeventstore');
var imes = new EventStore();

var Repository = require('./repository');
var repo = new Repository();
repo.EventStore = imes;

var Processor = require('./commandprocessor');
var CommandProcessor = new Processor();
CommandProcessor.repo = repo;

tortoise
    .queue('microservice-queue')
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
    "Method":"ChangeCompanyLegalName",
    "Version":"1",
    "Data":{
        "LegalName":"First Legal Name"
    },
    "MetaData":{
        "LegalName":""
    }
}
*/