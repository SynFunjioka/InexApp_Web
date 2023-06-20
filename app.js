require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
// const request = require('request');
const { APP_PORT } = process.env;

const cookieParser = require('cookie-parser');


//* Imports
const indexRoute = require('./app/routes/index');
const apiRoute = require('./app/routes/api/api');
const { checkToken } = require('./middleware/passport.middleware');

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(cookieParser());

// app.use(session({ secret: SECRET_TOKEN, resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

//* Middleware de rutas
app.use('/', indexRoute);
app.use('/api', checkToken, apiRoute);

app.listen(APP_PORT, () => {
    console.log(`App listening on port ${APP_PORT}`);
});