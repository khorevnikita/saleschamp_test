import Database from "../database";

const MongoDB = require('mongodb');
const moment = require('moment')
import IModel from "../interfaces/IModel";


export default class BaseModel implements IModel {

    protected useTimestamps: boolean = true;
    protected timestampsFormat: string = "YYYY-MM-DD HH:mm:ss";

    readonly attributes: string[] = ['_id'];

    constructor() {
        // todo: check if property is exists in model
        if (this.useTimestamps) {
            this.attributes.concat(['createdAt', 'updatedAt'])
        }

    }

    static buildCollectionName(str) {
        let plural = "s";
        let modelName = str.toLowerCase();
        if (modelName.charAt(modelName.length - 1) === 's') {
            plural = 'es';
        }
        return `${modelName}${plural}`
    }

    getCollectionName(): string {
        return BaseModel.buildCollectionName(this.constructor.name);
    }

    static getCollectionName(): string {
        return this.buildCollectionName(this.name)
    }

    isUsingTimestamps(): boolean {
        return this.useTimestamps;
    }

    getTimestampsFormat(): string {
        return this.timestampsFormat;
    }


    protected initConnection() {
        return Database.getCollection(this.getCollectionName());
    }

    static async findAll(condition = {}, limit = 30, toJson = false) {
        const collection = await Database.getCollection(this.getCollectionName());
        let rows = await collection.find(condition).limit(limit).toArray();
        return rows.map(row => {
            let model = new this().fill(row);
            if (toJson) {
                model = model.toJson()
            }
            return model;
        })

    }

    async save() {
        const collection = await this.initConnection();
        if (this['_id']) {
            if (this.isUsingTimestamps()) {
                this['updatedAt'] = moment().format(this.getTimestampsFormat());
            }
            await collection.updateOne({
                _id: this['_id']
            }, {
                $set: this.toJson()
            });
        } else {
            if (this.isUsingTimestamps()) {
                this['createdAt'] = moment().format(this.getTimestampsFormat());
            }
            const result = await collection.insertOne(this.toJson());
            this['_id'] = result.insertedId;
        }
        return this;
    }

    static async findById(id) {
        var o_id = new MongoDB.ObjectID(id);
        const collection = await Database.getCollection(this.getCollectionName());
        let row = await collection.findOne({
            _id: o_id
        });
        if (!row) {
            return null;
        }
        return new this().fill(row)
    }

    static async findOne(condition = {}) {
        const collection = await Database.getCollection(this.getCollectionName());
        let row = await collection.findOne(condition);
        if (!row) {
            console.log('no row');
            return null;
        }
        return new this().fill(row)
    }

    async destroy() {
        const collection = await Database.getCollection(this.getCollectionName());
        const res = collection.deleteOne({
            _id: this['_id']
        })
        return res.deletedCount > 0;
    }

    fill(props) {
        return Object.assign(this, props);
    }

    toJson() {
        let json = {}
        for (var k of this.attributes) {
            json[k] = this[k];
        }
        return json;
    }
}
