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
const auth = require('./server/auth/auth');

nunjucks.configure('app', {
  autoescape: true,
  express   : app
});

app.use("/admin", express.static('app/admin'));
app.use("/landing", express.static('app/landing'));

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

app.get('/contact', (req, res) => {
  res.render('landing/contact.html');
});

app.get('/about', (req, res) => {
  res.render('landing/about.html');
});

app.get('/showcase', (req, res) => {
  res.render('landing/showcase.html');
});

app.get('/careers', (req, res) => {
  res.render('landing/careers.html');
});

app.get('/signin', (req, res) => {
  res.render('landing/signin.html');
});

app.post('/signin', (req, res) => {
  req.checkBody('email', 'Invalid postparam').notEmpty();
  req.checkBody('password', 'Invalid postparam').notEmpty();
  if (req.validationErrors()) {
    res.json({ err: 'Invalid param' });
    return;
  }
  auth.signin(req.body).then((data) => {
    res.json({ auth: data });
  }).catch((err) => {
    res.json({ err });
  });
  return;
});

app.get('/signup', function(req, res) {
  res.render('landing/signup.html');
});

app.post('/signup', (req, res) => {
  auth.signup(req.body).then((data) => {
    res.json({ auth: data });
  }).catch((err) => {
    if (err === 'duplicate') {
      res.json({ err });
    } else {
      res.json({ err });
    }
  });
});

app.get('/app', (req, res) => {
  res.render('admin/dist/index.html');
});


module.exports = app;
