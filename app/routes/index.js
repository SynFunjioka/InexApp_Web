const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index'); // Renderizar una vista usando el motor de plantillas
});

router.get('/login', (req, res) => {
  res.render('./pages/login');
});

router.get('/signup', (req, res) => {
  res.render('./pages/register');
});

router.get('/home', (req, res) => {
  res.render('./pages/home');
});

module.exports = router;
