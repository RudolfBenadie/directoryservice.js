class Aggregate {
    constructor() {
        this.Id = '';
        this.Version = 0;
        this.EventStream = [];
    }

    ApplyAll() {
        for (let i = 0; i < this.EventStream.length; i++) {
            var item = this.EventStream[i];
            this.Apply(item);
        }
    }

    Apply(event) {
        if (this[event.Method])
            this[event.Method](event);
    }

    GetEvents() {
        return this.EventStream;
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
            event.Method = "CompanyLegalNameChanged";
            event.MetaData = { "LegalName": this.LegalName };
            this.Apply(event);
            this.EventStream.push(event);
        }
        catch (error) {
            //log the error
        }
    }

    ChangeCompanyShortName(message) {
        try {
            var event = message;
            event.Method = "CompanyShortNameChanged";
            event.MetaData = { "ShortName": this.LegalName };
            this.Apply(event);
            this.EventStream.push(event);
        }
        catch (error) {

        }
    }

    CompanyLegalNameChanged(event) {
        this.LegalName = event.Data.LegalName;
    }

    CompanyShortNameChanged(event) {
        this.ShortName = event.Data.ShortName;
    }
}

module.exports = function DirectoryDomain() {
    this.classes = {
        "Company": Company
    }
}
