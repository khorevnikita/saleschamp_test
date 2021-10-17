import Model from "./BaseModel"

export default class Address extends Model {

    id: string;
    country: string;
    city: string;
    street: string;
    postalCode: string;
    number: bigint;
    numberAddition: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    name: string;
    email: string;

    // todo make only one var
    protected collection = "addresses"
    protected static collection = "addresses"

    constructor(props) {
        super(props);
    }


    static getList() {

    }
}