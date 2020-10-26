const { getItems, getItem } = require('../services/product');

exports.searchItems = async (req, res, next) => {
  try {
    const query = req.query.q;
    const result = await getItems(query);
    res.json(result);
  } catch(e) {
    next(e);
  }
}

exports.getItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getItem(id);
    res.json(result);
  }
  catch(e) {
    next(e);
  }
}
