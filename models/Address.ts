import Model from "./BaseModel"

export default class Address extends Model {

    readonly attributes: string[] = ['_id', 'country', 'city', 'street', 'postalCode', 'number', 'numberAddition', 'status', 'name', 'email'];

    static allowedStatuses: string[] = ['not at home', 'not interested', 'interested'];

    id: string;
    country: string;
    city: string;
    street: string;
    postalCode: string;
    number: bigint;
    numberAddition: string;
    status: string;
    name: string;
    email: string;


    constructor() {
        super();
    }


    static getList() {

    }
}