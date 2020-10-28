const path = require('path');

require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  meliApiSearchUrl: process.env.MELI_API_SEARCH_URL,
  meliApiItemsUrl: process.env.MELI_API_ITEMS_URL,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
