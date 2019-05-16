var domain = require("./domain")
domain = new domain();

module.exports = function Repository() {
    this.EventStore = null;

    this.Get = function (type, id) {
        var streamName = type + id;
        if (!this.EventStore) throw new Exception("The event store must be assigned.");
        var eventStream = this.EventStore.ReadStream(streamName);
        var aggregate;
        if (domain[type]) aggregate = domain[type]();
        aggregate.EventStream.push(eventStream);
        return aggregate;
    }
}
