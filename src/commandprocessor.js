/*
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

module.exports = function Processor() {
    this.repo = null;

    this.Process = function (message) {
        var aggregateId = message.Id;
        var entity = message.Entity;
        var aggregatePromise = this.repo.Get(entity, aggregateId);
        return aggregatePromise
            .then(data => {
                var aggregate = data;
                if (aggregate[message.Method]) {
                    aggregate[message.Method](message);
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
