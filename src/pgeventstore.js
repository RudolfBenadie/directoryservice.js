const promise = require('bluebird'); // or any other Promise/A+ compatible library;

const initOptions = {
    promiseLib: promise, // overriding the default (ES6 Promise);
    query(e) {
        console.log('QUERY:', e.query);
    }
};

const pgp = require('pg-promise')(initOptions);
// See also: http://vitaly-t.github.io/pg-promise/module-pg-promise.html

// Database connection details;
const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'Microservice',
    user: 'postgres',
    password: 'P455word'
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js

const db = pgp(cn); // database instance;

module.exports = function EventStore() {

    this.Events = new Array();
    this.Connected = false;

    this.Connect = function () {
        this.Connected = true;
    }

    this.Disconnecct = function () {
        connectionPool = null;
        this.Connected = false;
    };

    this.AppendStream = function (streamName, events) {
        if (!streamName) throw new Exception("The stream name must have a value");
        if (!events) { return; }
        return db.tx(t => {
            const queries = events.map(e => {
                return t.one('INSERT INTO public.company_event_store (stream_name, data) VALUES($1, $2) RETURNING id', [streamName, e], u => u.id);
            })
            return t.batch(queries);
        })
    }

    this.ReadStream = function (streamName) {
        if (!streamName) throw new Exception("The stream name must have a value");
        return db.any('SELECT * FROM company_event_store WHERE stream_name = ($1)', [streamName]);
    }

    this.StreamExists = function (streamName) {
        return !(!this.Events[streamName])
    }
}
