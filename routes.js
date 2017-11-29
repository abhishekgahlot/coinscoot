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