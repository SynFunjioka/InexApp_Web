const express = require('express');
const router = express.Router();

const { GetTransactions } = require('../controllers/home.controller');

router.get('/', async (req, res) => {
  try {
    const { transactions, doughnutChartConfig } = await GetTransactions();
    console.log('Getting transactions', transactions);

    res.render('./pages/home', { transactions, doughnutChartConfig });
  } catch (error) {
    console.log('Error loading transactions - controller', error);
    res.status(500).send('Error loading transactions');
  }
});

router.get('/login', (req, res) => {
  res.render('./pages/login');
});

router.get('/signup', (req, res) => {
  res.render('./pages/register');
});


module.exports = router;
