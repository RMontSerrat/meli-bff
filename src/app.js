require('dotenv').config();

const app = require('./config/express');

const { PORT, NODE_ENV } = process.env;

// listen to requests
app.listen(PORT, () => console.info(`server started on port ${PORT} (${NODE_ENV})`));
