import Model from "./BaseModel"

export default class Address extends Model {

    readonly attributes: string[] = ['_id', 'country', 'city', 'street', 'postalCode', 'number', 'numberAddition', 'status', 'name', 'email'];

    static allowedStatuses: string[] = ['not at home', 'not interested', 'interested'];

    static updatable: string[] = ['status', 'name', 'email']

    id: string;
    country: string;
    city: string;
    street: string;
    postalCode: string;
    number: number;
    numberAddition: string;
    status: string;
    name: string;
    email: string;


    constructor() {
        super();
    }


    static getUpdatableData(data) {
        return Object.keys(data)
            .filter(key => this.updatable.includes(key))
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
    }
}