require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');

//* Imports
const indexRoute = require('./app/routes/index');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Rutas
app.use('/', indexRoute);

app.listen(3000, () => {
    console.log('App listening on port 3000');
});