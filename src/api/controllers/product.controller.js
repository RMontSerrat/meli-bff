const logger = require('../../config/logger');
const { normalizeSearchProducts, normalizeProduct } = require('../helpers/normalizeProduct');
const { getItems, getItem } = require('../services/product');
const APIError = require('../middlewares/apiError');
const {
  searchValidation,
  itemValidation,
} = require('../validations/product.validation');

const search = async (req, res, next) => {
  try {
    const query = req.query.q;
    const result = await getItems(query);
    const normalizedResult = normalizeSearchProducts(result);

    await searchValidation.validateAsync(normalizedResult);

    return res.json(normalizedResult);
  } catch (error) {
    logger.error(`search error: ${error}`);
    return next(new APIError({
      message: error.message,
      status: error.status,
    }));
  }
};

const item = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getItem(id);
    const normalizedResult = normalizeProduct(result);

    await itemValidation.validateAsync(normalizedResult);

    return res.json(normalizedResult);
  } catch (error) {
    logger.error(`item error: ${error}`);
    return next(new APIError({
      message: error.message,
      status: error.status,
    }));
  }
};

module.exports = {
  search,
  item,
};
