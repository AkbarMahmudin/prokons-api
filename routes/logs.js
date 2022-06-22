const express = require('express');

const router = express.Router();

const logsHandler = require('./handlers/log-orders');

router.get('/income', logsHandler.getIncomes);

module.exports = router;
