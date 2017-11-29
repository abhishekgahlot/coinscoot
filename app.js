const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bluebird = require('bluebird');
const RedisStore = require('connect-redis')(session);

global.Promise = bluebird;

const app = express();

const db = require('./server/db/interface');
const dbw = require('./server/db/wrapper').dbw;

nunjucks.configure('app', {
  autoescape: true,
  express   : app
});

app.use("/admin", express.static('app/admin/public'))
app.use("/landing", express.static('app/landing/public'))

app.use(bodyParser.json());
app.use(expressValidator([]));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({ store: new RedisStore(),
                  secret: 'ilovebitches',
                  saveUninitialized: true,
                  resave: true,
                }));

app.get('/', (req, res) => {
  res.render('landing/index.html');
});

app.get('/contact', function(req, res) {
  res.render('landing/contact.html');
});

app.get('/about', function(req, res) {
  res.render('landing/about.html');
});

app.get('/showcase', function(req, res) {
  res.render('landing/showcase.html');
});

app.get('/careers', function(req, res) {
  res.render('landing/careers.html');
});

app.get('/signin', function(req, res) {
  res.render('landing/signin.html');
});

app.get('/signup', function(req, res) {
  res.render('landing/signup.html');
});

app.get('/app', (req, res) => {
  res.render('admin/dist/index.html');
});

module.exports = app;
