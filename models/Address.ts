import Model from "./BaseModel"

export default class Address extends Model {

    readonly attributes: string[] = ['_id','id', 'country', 'city', 'street', 'postalCode', 'number', 'numberAddition', 'status', 'name', 'email'];

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