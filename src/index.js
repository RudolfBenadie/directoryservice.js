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
    .queue('command-queue')
    .prefetch(1)
    .json()  // Decodes message from JSON
    .subscribe(function (msg, ack, nack) {
        var processPromise = CommandProcessor.Process(msg);
        processPromise
            .then(result => {
                if (result == "success") {
                    ack(); // or nack()
                }
                else {
                    nack();
                }
            })
    });

