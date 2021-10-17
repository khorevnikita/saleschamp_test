const conf = require('../config/database')
const MongoDB = require('mongodb').MongoClient;

export default class Database {
    static async connect() {
        return await MongoDB.connect(conf.url).then((database, err) => {
            if (err) return console.log(err)
            return database.db(conf.database);
        });
    }

    static async getCollection(collection) {
        return await this.connect().then(connection => {
            return connection.collection(collection)
        });
    }
}