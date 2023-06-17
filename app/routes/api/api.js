const express = require('express');
const router = express.Router();

const transaccion = require('./transaction.api');

router.use('/transactions', transaccion);

module.exports = router;
