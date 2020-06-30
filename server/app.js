const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const pump = require('pump');
const Transform = require('stream').Transform;
const Readable = require('stream').Readable;


// define index.html body parser
let indexStream = fs.createReadStream(path.join(__dirname, '../dist/index.html'));

function streamToString(stream, callback) {
  let chunks = [];
  stream.on('data', chunk => {
    chunks.push(chunk.toString());
  });
  stream.on('end', () => {
    callback(chunks.join(''));
  });
}

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

const contextData = { indexHtmlData: '' };

streamToString(indexStream, data => {
  contextData.indexHtmlData = data;
  console.log('loaded index.html into memory: ', contextData.indexHtmlData.length);
});

function metaTransform(data, encoding, done) {
  console.log('parser: ', encoding, this.ogImage);
  if (this.ogImage) {
    const ogMeta =
      '<meta property="og:image" content="' +
      this.ogImage +
      '">' +
      '<meta property="og:image:width" content="2048">' +
      '<meta property="og:image:height" content="1024">' +
      '</head>';
    const str = data.toString().replace('</head>', ogMeta);
    this.push(str);
  } else {
    this.push(data.toString());
  }
  done();
}

function getParameterByName(name, url) {
  if (url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}

let app = express();
app.disable('x-powered-by');

app.use(forceHTTPS);
app.use(whitelistCheck);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
  .use(express.static(path.join(__dirname, '../dist'), { maxAge: '1d' }))
  // .get('*', (req, res) => {
  //     console.log('get req:', req.url);
  //     res.sendFile(path.join(__dirname, 'dist/index.html'));
  // })
  .get('*', (req, res) => {
    // console.log('get "*":', req.url);

    let url = getParameterByName('state', req.url);
    if (url) {
      url = Buffer.from(url, 'base64').toString();
      url = decodeURIComponent(url);
      let metaTransformPipe = new Transform();
      metaTransformPipe.ogImage = url;
      metaTransformPipe._transform = metaTransform;
      metaTransformPipe.on('error', function(err) {
        console.log('Parser error:', err);
      });

      let indexStrStream = new Readable();
      indexStrStream._read = function read() {};
      indexStrStream.push(contextData.indexHtmlData);
      indexStrStream.push(null);

      pump(indexStrStream, metaTransformPipe, res, function(err) {
        if (err) {
          console.log('pump finished with error:', err);
        }
      });
    } else {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
  });

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
