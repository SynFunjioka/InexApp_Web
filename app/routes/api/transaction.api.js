const express = require('express');
const router = express.Router();

const { getTransactions, createTransaction, deleteTransaction } = require('../../controllers/api/transaction.controller');

router.get('/', getTransactions);

router.post('/', createTransaction);

router.put('/:id/delete', deleteTransaction);

module.exports = router;
