import Controller from "./Controller";
import Address from "../models/Address";

export default class AddressController extends Controller {

    static async list(req, res) {
        const addresses = await Address.findAll();
        res.json({
            'addresses': addresses
        })

    }

    static async create(req, res) {
        let address = new Address(req.body);
        await address.save();
        res.json({
            address: address
        })
    }

    static async show(req, res) {
        const address = await Address.findById(req.params.id)

        res.json({
            address: address
        })
    }

    static async update(req, res) {
        let address = await Address.findById(req.params.id);
        address = address.fill(req.body);
        await address.save();

        res.json({
            address: address
        })

    }

    static async destroy(req, res) {
        let address = await Address.findById(req.params.id);
        await address.destroy()
        res.json({
            status: "ok"
        })
    }

}