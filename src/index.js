require('dotenv').config();

const app = require('./config/express');
const logger = require('./config/logger');

const { PORT, NODE_ENV } = process.env;

app.listen(PORT, () => logger.info(`server started on port ${PORT} (${NODE_ENV})`));

module.exports = app;
