const {validationResult} = require('express-validator');

const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return error.msg;
    },
});

export default class Controller {
    static validate(request) {
        return myValidationResult(request)
    }
}