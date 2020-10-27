const express = require('express');
const router = express.Router();

const controllers = require('../controllers/product.controller');

router.get('/healthcheck', (req, res) => {
  res.json({
    ok: true,
  });
});

router.get('/items', controllers.search);
router.get('/items/:id', controllers.item);

module.exports = router;
