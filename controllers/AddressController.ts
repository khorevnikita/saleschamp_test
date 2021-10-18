import Controller from "./Controller";
import Address from "../models/Address";

export default class AddressController extends Controller {

    static async list(req, res) {
        const addresses = await Address.findAll({}, 30, true);
        res.json({
            'addresses': addresses
        })

    }

    static async create(req, res) {
        const errors = super.validate(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        let address = new Address();
        address = address.fill(req.body)
        address = await address.save();
        res.json({
            address: address.toJson()
        }, 201)
    }

    static async show(req, res) {
        const address = await Address.findById(req.params.id)
        if (!address) {
            return res.status(404).json({
                msg: "Address not found"
            })
        }
        res.json({
            address: address.toJson()
        })
    }

    static async update(req, res) {
        const errors = super.validate(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        let address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json({
                'msg': 'address not found'
            });
        }

        address = address.fill(Address.getUpdatableData(req.body));
        address = await address.save();

        res.json({
            address: address.toJson()
        })

    }

    static async destroy(req, res) {
        let address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json("The address is not found");
        }
        // 409 code is for soft deletes. todo soft deletes
        await address.destroy()
        res.status(204);
    }

}