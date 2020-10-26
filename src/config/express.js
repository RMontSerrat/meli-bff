const express = require('express');
const bodyParser = require('body-parser');

const allowlist = ['localhost:5000'];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions);
}

const cors = require('cors');

const routes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptionsDelegate));

app.use('/', routes);

module.exports = app;
