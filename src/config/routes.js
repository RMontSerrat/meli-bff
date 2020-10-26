const express = require('express');
const validate = require('express-validation');
const router = express.Router();

const controllers = require('../api/controllers/product.controller');

router.get('/healthcheck', (req, res) => {
  res.json({
    ok: true,
  });
});

router.get('/items', controllers.searchItems);
router.get('/items/:id', controllers.getItem);

module.exports = router;
