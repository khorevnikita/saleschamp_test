var express = require('express');
var router = express.Router();
import BaseMiddleware from "../middlewares/BaseMiddleware"
import Controller from "../controllers/AddressController"

let validator = require("../validators/AddressValidator")

/* CRUD ROUTES */

router.get('/', BaseMiddleware.checkContentType, Controller.list);
router.post('/', BaseMiddleware.checkContentType, validator.create, Controller.create);
router.get('/:id', BaseMiddleware.checkContentType, Controller.show);
router.patch('/:id', BaseMiddleware.checkContentType, validator.update, Controller.update);
router.delete('/:id', BaseMiddleware.checkContentType, Controller.destroy);

/* ANOTHER ROUTES... */

module.exports = router;