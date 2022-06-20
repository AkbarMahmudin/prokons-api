const express = require('express');

const router = express.Router();

const logsHandler = require('./handlers/logs');

router.get('/income', logsHandler.getIncomes);

module.exports = router;
