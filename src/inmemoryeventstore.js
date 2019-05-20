module.exports = function EventStore() {

    this.Events = {};
    this.Connected = false;

    this.Connect = function () {
        this.Connected = true;
    }

    this.Disconnecct = function () {
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
