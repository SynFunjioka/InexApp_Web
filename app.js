require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');

//* Imports
const indexRoute = require('./app/routes/index');
const apiRoute = require('./app/routes/api/api');

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//* Middleware de rutas
app.use('/', indexRoute);
app.use('/api', apiRoute);

app.listen(3000, () => {
    console.log('App listening on port 3000');
});