var domain = require("./domain")
var Tortoise = require('tortoise');
var tortoise = new Tortoise('amqp://localhost');

function publishMessage(payload) {
    tortoise
        .queue('event-queue')
        .publish(payload)
}

module.exports = function Repository() {
    var entityDefinitions = (new domain()).classes;
    this.EventStore = null;

    this.Get = function Get(type, id) {
        var aggregate;
        if (entityDefinitions[type]) aggregate = new entityDefinitions[type](id);
        if (!this.EventStore) throw new Exception("The event store must be assigned.");
        var streamName = type + id;
        var eventStreamPromise = this.EventStore.ReadStream(streamName);
        return eventStreamPromise
            .then(eventStream => {
                if (eventStream && eventStream.length > 0) {
                    aggregate.EventStream.push(...eventStream);
                    aggregate.ApplyAll();
                    aggregate.ClearEvents();
                }
                return aggregate;
            })
    }

    this.Save = function Save(type, id, events) {
        var streamName = type + id;
        var eventStreamPromise = this.EventStore.AppendStream(streamName, events);
        return eventStreamPromise
            .then(result => {
                if (result == "") {
                    events.map(e => {
                        publishMessage(e);
                    })
                    return "success"
                }
            })
            .catch(err => {
                throw err;
            })
    }
}
