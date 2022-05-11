const express = require('express');

const router = express.Router();

const variantsHandler = require('./handlers/variants');
const { variantValidator } = require('../validator');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);
router.post('/', variantValidator, variantsHandler.create);
router.put('/:id', variantsHandler.update);
router.delete('/:id', variantsHandler.destroy);

module.exports = router;
