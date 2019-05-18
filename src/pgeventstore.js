import { createPool } from 'slonik';

module.exports = function EventStore() {

    var connectionPool;

    this.Events = {};
    this.Connected = false;

    this.Connect = function () {
        connectionPool = createPool('postgres://postgres:P455word@jnb-pc1:5432/Microservice');
        this.Connected = true;
    }

    this.Disconnecct = function () {
        connectionPool = null;
        this.Connected = false;
    };

    this.AppendStream = function (streamName, events) {
        if (!streamName) throw new Exception("The stream name must have a value");
        if (!this.Events[streamName]) this.Events[streamName] = new Array();
        this.Events[streamName].push(...events);
    }

    this.ReadStream = function (streamName) {
        if (!streamName) throw new Exception("The stream name must have a value");
        return this.Events[streamName];
    }

    this.StreamExists = function (streamName) {
        return !(!this.Events[streamName])
    }
}
