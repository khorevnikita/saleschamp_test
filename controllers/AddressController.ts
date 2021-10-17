import Controller from "./Controller";
import Address from "../models/Address";

export default class AddressController extends Controller {

    static async list(req, res) {
        const addresses = await Address.findAll({},30,true);
        res.json({
            'addresses': addresses
        })

    }

    static async create(req, res) {
        let address = new Address();
        address = address.fill(req.body)
        await address.save();
        res.json({
            address: address.toJson()
        }, 201)
    }

    static async show(req, res) {
        const address = await Address.findById(req.params.id)
        if (!address) {
            return res.json(404)
        }
        res.json({
            address: address.toJson()
        })
    }

    static async update(req, res) {
        let address = await Address.findById(req.params.id);
        if (!address) {
            return res.json(404);
        }
        address = address.fill(req.body);
        await address.save();

        res.json({
            address: address.toJson()
        }, 204)

    }

    static async destroy(req, res) {
        let address = await Address.findById(req.params.id);
        await address.destroy()
        res.json({
            status: "ok"
        })
    }

}