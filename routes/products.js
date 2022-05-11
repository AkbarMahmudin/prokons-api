const express = require('express');

const router = express.Router();

const productsHandler = require('./handlers/products');
const { productValidator } = require('../validator');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);
router.get('/', productsHandler.getProducts);
router.get('/:id', productsHandler.getProduct);
router.post('/', productValidator, productsHandler.create);
router.put('/:id', productValidator, productsHandler.update);
router.delete('/:id', productsHandler.destroy);

module.exports = router;
