const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const forceHTTPS = (req, res, next) => {
  console.log('secure check:', req.secure, req.header('x-forwarded-proto'), req.connection.encrypted);
  if (!req.secure && !req.connection.encrypted && req.header('x-forwarded-proto') !== 'https') {
    console.log('redirect https ');
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
};

const whitelistCheck = function(req, res, next) {
  console.log('checking host: ', req.get('host'), req.url, req.path);
  next();
};

let app = express();
app.disable('x-powered-by');

// app.use(forceHTTPS);
app.use(whitelistCheck);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
  .use(express.static(path.join(__dirname, '../dist'), { maxAge: '1d' }))
  .get('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

app
  .use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  })
  .use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: 'Server error - please contact technical support',
        error: {}
      }
    });
    next(err);
  });

// finally, let's start our server...
const port = process.env.PORT || '3000';

let appName = process.env.APP_NAME || 'application';
console.log('Starting ' + appName);

let server = app.listen(port, function() {
  console.log('Listening on port ' + server.address().port);
});
