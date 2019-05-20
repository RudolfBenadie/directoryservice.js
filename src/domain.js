class Aggregate {
    constructor() {
        this.Id = '';
        this.Version = 0;
        this.EventStream = [];
    }

    ApplyAll() {
        for (let i = 0; i < this.EventStream.length; i++) {
            var item = this.EventStream[i].data;
            this.Apply(item);
        }
    }

    Apply(event) {
        if (this[event.Method])
            this[event.Method](event.Data);
    }

    GetEvents() {
        return this.EventStreamEventStream;
    }

    ClearEvents() {
        this.EventStream.length = 0;
    }
}

class Company extends Aggregate {
    constructor(id) {
        super();
        this.Id = id;
        this.LegalName = "";
        this.ShortName = "";
    }

    ChangeCompanyLegalName(message) {
        try {
            //Validate

            var event = message;
            message.Method = "CompanyLegalNameChanged";
            message.MetaData = { "LegalName": this.LegalName };

            this.LegalName = message.Data.LegalName;
            this.EventStream.push(event);
        }
        catch (error) {
            //log the error
        }
    }

    CompanyLegalNameChanged(event) {
        this.LegalName = event.LegalName;
    }
}

module.exports = function DirectoryDomain() {
    this.classes = {
        "Company": Company
    }
}
