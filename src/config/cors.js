const cors = require('cors');

const allowlist = ['http://localhost:5000'];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions);
}
const configCors = cors(corsOptionsDelegate);

module.exports = configCors;