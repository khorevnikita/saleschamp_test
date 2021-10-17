const {body} = require('express-validator');
import Address from "../models/Address"

exports.create = [
    body(['country']).notEmpty().isLength({min: 2, max: 2}).withMessage("The country code validation failed"),
    body(['city', 'street']).notEmpty().isLength({max: 255}).withMessage("The field is required"),
    body(["postalCode"]).notEmpty().isNumeric().isLength({max: 5, min: 5}).withMessage("The postal code is not valid"),
    body(['number']).isNumeric().custom(value => value > 0).withMessage("Number is required and must be >0"),
    body(['numberAddition']).isString().withMessage("The field must be a string")
];

exports.update = [
    body(['status']).notEmpty().isString().custom(value => {
        return Address.allowedStatuses.includes(value)
    }).withMessage("Status is not valid"),
    body(['name']).isString(),
    body(['email']).isEmail(),
];