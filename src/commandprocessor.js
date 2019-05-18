class CommandProcessor {

    constructor(repo) {
        this.repo = repo
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
        var aggregate = this.repo.Get(entity, aggregateId);
        var cp = new CommandProcessor(this.repo);
        if (cp[message.Method]) cp[message.Method](aggregate, message);
        this.repo.Save(entity, aggregateId, aggregate.EventStream);
        aggregate.ClearEvents();
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
