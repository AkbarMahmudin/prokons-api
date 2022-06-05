const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const colorsHandler = require('./handlers/colors');
const { colorValidator } = require('../validator');

router.use(verifyToken);
router.get('/', colorsHandler.getColors);
router.post('/', colorValidator, colorsHandler.create);
router.put('/:id', colorsHandler.update);
router.delete('/:id', colorsHandler.destroy);

module.exports = router;
