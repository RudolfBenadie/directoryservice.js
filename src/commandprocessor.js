class CommandProcessor {

    constructor() {
    }

    ChangeCompanyLegalName(aggregate, message) {
        console.log(aggregate);
        console.log(message.Method + ": ");
        console.log(message.Data);
        aggregate[message.Method](message);
    }
}

module.exports = function Processor() {
    this.repo = null;

    this.Process = function (message) {
        var aggregateId = message.Id;
        var entity = message.Entity;
        var aggregatePromise = this.repo.Get(entity, aggregateId);
        aggregatePromise
            .then(data => {
                var aggregate = data;
                var cp = new CommandProcessor();
                if (cp[message.Method]) cp[message.Method](aggregate, message);
                var savePromise = this.repo.Save(entity, aggregateId, aggregate.EventStream);
                savePromise
                    .then(res => {
                        aggregate.ClearEvents();
                        console.log(res);
                    })
            });
    }
}

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
