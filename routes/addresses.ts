var express = require('express');
var router = express.Router();
import BaseMiddleware from "../middlewares/BaseMiddleware"
import Controller from "../controllers/AddressController"

router.get('/', BaseMiddleware.checkContentType, Controller.list);
router.post('/', BaseMiddleware.checkContentType, Controller.create);
router.get('/:id', BaseMiddleware.checkContentType, Controller.show);
router.patch('/:id', BaseMiddleware.checkContentType, Controller.update);
router.delete('/:id', BaseMiddleware.checkContentType, Controller.destroy);

module.exports = router;