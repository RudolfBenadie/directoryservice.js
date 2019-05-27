var domain = require("./domain")

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
            .then(data => {
                var eventStream = data[0].company_read_stream;
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
        var result = this.EventStore.AppendStream(streamName, events);
        return result;
    }
}
