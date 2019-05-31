class CommandProcessor {

    constructor() {
    }

    ChangeCompanyLegalName(aggregate, message) {
        aggregate[message.Method](message);
    }
}

module.exports = function Processor() {
    this.repo = null;

    this.Process = function (message) {
        var aggregateId = message.Id;
        var entity = message.Entity;
        var aggregatePromise = this.repo.Get(entity, aggregateId);
        return aggregatePromise
            .then(data => {
                var aggregate = data;
                var cp = new CommandProcessor();
                if (cp[message.Method]) {
                    cp[message.Method](aggregate, message);
                    var savePromise = this.repo.Save(entity, aggregateId, aggregate.EventStream);
                    return savePromise
                        .then(res => {
                            console.log(res)
                            aggregate.ClearEvents();
                            return "success";
                        });
                }
                else {
                    return "fail";
                }
            });
    }
}
