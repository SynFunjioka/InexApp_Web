const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index'); // Renderizar una vista usando el motor de plantillas
});

router.get('/login', (req, res) => {
  res.render('./pages/login');
});

router.get('/register', (req, res) => {
  res.render();
});

module.exports = router;
