class CommandProcessor {

    constructor(repo) {
        this.repo = repo
    }

    ChangeCompanyLegalName(aggregate, message) {
        console.log(aggregate);
        console.log(message.Message + ": " + message.Data.LegalName);
        //Validate
    }
}


module.exports = function Processor() {
    this.repo = null;

    this.Process = function (message) {
        var aggregateId = message.Id;
        var entity = message.Entity;
        var aggregate = this.repo.Get(entity, aggregateId);

        var cp = new CommandProcessor(this.repo);
        if (cp[message.Message]) cp[message.Message](aggregate, message);
    }
}

/*
var m =
{
    "Id":"1",
    "Entity":"Company",
    "Message":"ChangeCompanyLegalName",
    "Version":"1",
    "Data":{
        "LegalName":"Company Legal Name"
    },
    "MetaData":{
        "LegalName":""
    }
}
*/