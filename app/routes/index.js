const express = require('express');
const router = express.Router();

const {checkToken, createCookieOfToken} = require('../../middleware/passport.middleware')
const { GetTransactions, CreateTransaction } = require('../controllers/home.controller');
const { login, signUp } = require('../services/auth.service');

router.get('/', checkToken, async (req, res) => {
  try {
    if (!req.user) {
      res.redirect('/login');
    }
    // console.log('valido token', req.cookies);
    const { transactions } = await GetTransactions({ deleted: 'false' });
    console.log('Getting transactions', transactions);

    res.render('./pages/home', { transactions });
  } catch (error) {
    console.log('Error loading transactions - controller', error);
    res.status(500);
  }
});

router.post('/', checkToken, async (req, res) => {
  try {
    if (!req.user) {
      res.redirect('/login');
    }
    const success = await CreateTransaction(req.body);

    if(success){
      res.redirect('/');
    }
    res.status(500);

  } catch (error) {
    // console.log('Error creating transactions - controller', error);
    res.status(500);
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const {success, user, token, message} = await login({email, password});
  
    if(success){
      // 📌 Coockie generator
      const [tokenName, tokenOptions] = createCookieOfToken(token);
      res.cookie(tokenName, token, tokenOptions);
      res.redirect('/');
    }else{
      throw "User not logged"
    }
  } catch (error) {
    console.log('Error on login post', error);
    res.redirect('/login');
  }
});

router.get('/login', checkToken, (req, res) => {
  if (req.user) {
    res.redirect('/');
  }
  res.render('./pages/login');
});

router.get('/signup', checkToken, (req, res) => {
  if (req.user) {
    res.redirect('/');
  }

  res.render('./pages/register');
});

router.post('/signup', async (req, res) => {
  try {
    const { success, newUser, token, message, error } = await signUp(req.body);

    if (success) {
      const [tokenName, tokenOptions] = createCookieOfToken(token);
      res.cookie(tokenName, token, tokenOptions);
      res.redirect('/');
    } else {
      res.status(400).json({ message, error });
    }
  } catch (error) {
    console.log('Error on creating account', error);
    res.redirect('/signup');
  }
});

module.exports = router;
