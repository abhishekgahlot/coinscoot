var nunjucks  = require('nunjucks');
var express   = require('express');
var path 			= require('path');
var app       = express();

app.listen(3012);

nunjucks.configure('views', {
  autoescape: true,
  express   : app
});

app.use(express.static('public'))

app.get('/', function(req, res) {
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