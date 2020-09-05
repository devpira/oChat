const { MongoClient } = require("mongodb");
const { uri, database } = require('./config');

const mongoClient = new MongoClient(uri, { useUnifiedTopology: true });

let _db;

const initializeMongodb = func => {
    if (_db) {
        func();
    } else {
        mongoClient.connect()
            .then(client => {
                _db = client;
                func();
            }).catch(err => {
                console.log(err)
            });
    }
}

const mongoDriver = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db.db(database);
}

module.exports = {
    initializeMongodb,
    mongoDriver
}
