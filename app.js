const express = require('express');
const app = express();

require('./controllers/api')(app);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', express.static(__dirname + '/ui'));

app.use('*', (req, res, next) => {
  let ref = req.get('referer');

  if (ref) {
    let path = ref
      .replace(req.get('host'), '')
      .replace(new RegExp('http://|https://'), '');

    let redirectPath = path.substring(0, path.length - 1) + req.originalUrl;

    if (!req.originalUrl.includes(path)) res.redirect(redirectPath);
  }
  next();
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.redirect('/');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(8080, function() {
  console.log('server listening on port 8080!');
});
