var express = require('express');
var router = express.Router();
import Middleware from "../middlewares/AnyMiddleware"
import Controller from "../controllers/AddressController"

router.get('/', Middleware.anyMethod,Controller.list);
router.post('/', Middleware.anyMethod,Controller.create);
router.get('/:id', Middleware.anyMethod,Controller.show);
router.patch('/:id', Middleware.anyMethod,Controller.update);
router.delete('/:id', Middleware.anyMethod,Controller.destroy);

module.exports = router;