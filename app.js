var nunjucks  = require('nunjucks');
var express   = require('express');
var path 			= require('path');
var app       = express();

app.listen(3012);

nunjucks.configure('app/landing', {
  autoescape: true,
  express   : app
});

app.use(express.static('app'))

const dirLanding = 'app/landing';
app.get('/', (req, res) => {
  res.render('index.html', { root: dirLanding });
});


app.get('/contact', function(req, res) {
  res.render('contact.html', { root: dirLanding });
});

app.get('/about', function(req, res) {
  res.render('about.html', { root: dirLanding });
});

app.get('/showcase', function(req, res) {
  res.render('showcase.html', { root: dirLanding });
});

app.get('/careers', function(req, res) {
  res.render('careers.html', { root: dirLanding });
});

