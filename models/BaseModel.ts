import Database from "../database";

const MongoDB = require('mongodb')

export default class BaseModel {

    protected collection: string;
    protected static collection: string;

    constructor(props) {
        // todo: check if property is exists in model
        Object.assign(this, props);
    }

    protected initConnection() {
        return Database.getCollection(this.collection);
    }

    static async findAll(condition = {}, limit = 30) {
        const collection = await Database.getCollection(this.collection);
        let rows = await collection.find(condition).limit(limit).toArray();
        return rows.map(row => new this(row))

    }

    async save() {
        const collection = await this.initConnection();
        if (this['_id']) {
            await collection.updateOne({
                _id: this['_id']
            }, {
                $set: this
            });
        } else {
            const result = await collection.insertOne(this);
            this['_id'] = result.insertedId;
        }
        return this;
    }

    static async findById(id) {
        var o_id = new MongoDB.ObjectID(id);
        const collection = await Database.getCollection(this.collection);
        let row = await collection.findOne({
            _id: o_id
        });
        if (!row) {
            return null;
        }
        return new this(row);
    }

    static async findOne(condition = {}) {
        const collection = await Database.getCollection(this.collection);
        let row = await collection.findOne(condition);
        if (!row) {
            console.log('no row');
            return null;
        }
        return new this(row);
    }

    async destroy() {
        const collection = await Database.getCollection(this.collection);
        const res = collection.deleteOne({
            _id: this['_id']
        })
        return res.deletedCount > 0;
    }

    fill(props) {
        return Object.assign(this, props);
    }
}
