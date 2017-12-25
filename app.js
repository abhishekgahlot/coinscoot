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
const EmailService = require("./server/email/service");

nunjucks.configure('app', {
  autoescape: true,
	express   : app,
	noCache: true
});

app.use("/app", express.static('app/'));
app.use("/landing", express.static('app/landing/public'));

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
  res.render('landing/index-prev.html');
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

app.get('/blog', (req, res) => {
  res.redirect('http://blog.coinscoot.com/');
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
  return auth.signin(req.body)
  .then((data) => {
		if (data) {
			req.session.email = req.body.email;
		}
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
  return auth.signup(req.body)
  .then((data) => {
		EmailService.sendWelcomeEmail(req.body.email);
    res.json(data);
  }).catch((err) => {
    if (err === 'duplicate') {
      res.json({ err });
    } else {
      res.json({ err });
    }
  });
});

app.get('/activate/:activation_id', (req, res) => {
  return auth.activate(req.params)
    .then((data) => {
      if (data.success) {
        req.session.email = req.body.email;
        res.redirect('/app');
      } else {
        res.json({error: "Invalid activation Id"})
      }
    }).catch((err) => {
      if (err === 'duplicate') {
        res.json({ err });
      } else {
        res.json(err);
      }
    });
});

app.get('/app', (req, res) => {
  res.render('app/index.html');
});

app.get('/session', (req, res) => {
	res.json({ session: req.session.email });
});

app.get('/logout', (req, res) => {
	req.session.destroy();	
	res.redirect('/');
});

module.exports = app;
