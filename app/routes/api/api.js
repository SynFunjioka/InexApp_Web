const express = require('express');
const router = express.Router();

const transaccion = require('./transaction.api');
const users = require('./user.api');

router.use('/transactions', transaccion);
router.use('/users', transaccion);

module.exports = router;
