const express = require('express');

const router = express.Router();

const transactionsHandler = require('./handlers/transactions');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);
router.get('/', transactionsHandler.getTransactions);
router.get('/:id', transactionsHandler.getTransaction);

module.exports = router;
