import Database from "../database";

const MongoDB = require('mongodb');
const moment = require('moment')
import IModel from "../interfaces/IModel";


export default class BaseModel implements IModel {

    /* Timestamp settings for model */
    protected useTimestamps: boolean = true;
    protected timestampsFormat: string = "YYYY-MM-DD HH:mm:ss";

    /* List of model attributes */
    readonly attributes: string[] = ['_id'];

    constructor() {
        // todo: check if property is exists in model
    }

    /**
     * Build collection name from model name
     * @param str
     * @return str
     */

    static buildCollectionName(str: string): string {
        let plural = "s";
        let modelName = str.toLowerCase();
        if (modelName.charAt(modelName.length - 1) === 's') {
            plural = 'es';
        }
        return `${modelName}${plural}`
    }

    /**
     *  Get collection name
     */

    getCollectionName(): string {
        return BaseModel.buildCollectionName(this.constructor.name);
    }

    /* todo: Refactoring. Only 1 method should be */

    static getCollectionName(): string {
        return this.buildCollectionName(this.name)
    }

    isUsingTimestamps(): boolean {
        return this.useTimestamps;
    }

    getTimestampsFormat(): string {
        return this.timestampsFormat;
    }

    /**
     * Get DB table (collection) for model
     * @protected
     */

    protected initConnection() {
        return Database.getCollection(this.getCollectionName());
    }

    /**
     * Get multiple models from DB
     * @param condition
     * @param limit
     * @param toJson
     *
     * @return array
     */

    static async findAll(condition = {}, limit: number = 30, toJson: boolean = false) {
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

    /**
     * Upsert model into DB
     */

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
                this['updatedAt'] = moment().format(this.getTimestampsFormat());
            }
            const result = await collection.insertOne(this.toJson());
            this['_id'] = result.insertedId;
        }
        return this;
    }

    /**
     * Find model by Primary Key
     * @param id
     */
    static async findById(id: string) {
        let o_id;
        try {
            o_id = new MongoDB.ObjectID(id);
        } catch (e) {
            return null;
        }
        const collection = await Database.getCollection(this.getCollectionName());
        let row = await collection.findOne({
            _id: o_id
        });
        if (!row) {
            return null;
        }
        return new this().fill(row)
    }

    /**
     * Find model by any condition
     * @param condition
     */

    static async findOne(condition = {}) {
        const collection = await Database.getCollection(this.getCollectionName());
        let row = await collection.findOne(condition);
        if (!row) {
            console.log('no row');
            return null;
        }
        return new this().fill(row)
    }

    /**
     * Remove model from DB
     */
    async destroy() {
        const collection = await Database.getCollection(this.getCollectionName());
        const res = collection.deleteOne({
            _id: this['_id']
        })
        return res.deletedCount > 0;
    }

    /**
     * Fill model`s attributes
     * @param props
     */

    fill(props) {
        return Object.assign(this, props);
    }

    /**
     * Print model
     */
    toJson() {
        let json = {}
        let attrs = this.attributes;
        if (this.useTimestamps) {
            attrs = attrs.concat(['createdAt', 'updatedAt'])
        }

        for (let k of attrs) {
            json[k] = typeof this[k] !== 'undefined' ? this[k] : null;
        }
        return json;
    }
}
