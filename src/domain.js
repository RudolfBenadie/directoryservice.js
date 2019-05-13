class Aggregate {
    constructor() {
        this.Id = '';
        this.Version = 0;
        this.EventStream = [];
    }

    Apply() {
        for (let i = 0; i < this.EventStream.length; i++) {
            var item = this.EventStream[i];
            if (this[item.event])
                this[item.event](item.payload);
        }
    }

    GetEvents() {
        return EventStream;
    }

    ClearEvents() {
        EventStream.length = 0;
    }
}

class Company extends Aggregate {
    constructor(id) {
        this.Id = id;
        this.LegalName = "";
        this.ShortName = "";
    }

    CompanyLegalNameChanged(event) {
        this.LegalName = event.Data.LegalName;
    }
}

module.exports = function DirectoryDomain() {
    this.classes = {
        "Company": Company
    }
}
