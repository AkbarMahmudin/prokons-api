const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const ordersHandler = require('./handlers/orders');
const { orderValidator } = require('../validator');

router.post('/', [verifyToken, orderValidator], ordersHandler.create);

module.exports = router;
