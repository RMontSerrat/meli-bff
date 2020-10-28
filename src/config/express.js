const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const error = require('../api/middlewares/error');
const cors = require('./cors');

const { logs } = require('./vars');
const routes = require('../api/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(morgan(logs));

app.use(cors);

app.use('/api', routes);

app.use(error.converter);
app.use(error.notFound);

module.exports = app;
