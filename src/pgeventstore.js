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
    port: 4321, // 5432 is the default;
    database: 'directory_service',
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
                var jsonb = new Array();
                jsonb.push(e);
                return t.one('SELECT data.company_append_stream($1::varchar, $2::jsonb[])', [streamName, jsonb]);
            })
            return t.batch(queries);
        })
    }

    this.ReadStream = function (streamName) {
        if (!streamName) throw new Exception("The stream name must have a value");
        return db.any('SELECT data.company_read_stream ($1::varchar)', [streamName]);
    }

    this.StreamExists = function (streamName) {
        return !(!this.Events[streamName])
    }
}
