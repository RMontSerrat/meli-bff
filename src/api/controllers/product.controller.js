const httpStatus = require('http-status');
const { normalizeSearchProducts, normalizeProduct } = require('../helpers/normalizeProduct');
const { getItems, getItem } = require('../services/product');
const APIError = require('../utils/APIError');
const {
  searchValidation,
  itemValidation,
} = require('../validations/product.validation');

const search = async (req, res, next) => {
  const query = req.query.q;

  if (!query) {
    return next(new APIError({
      message: 'Necessary query argument',
      status: httpStatus.UNPROCESSABLE_ENTITY,
    }));
  }

  const result = await getItems(query);
  const normalizedResult = normalizeSearchProducts(result);

  await searchValidation.validateAsync(normalizedResult);

  return res.json(normalizedResult);
};

const item = async (req, res, next) => {
  const { id } = req.params;
  const result = await getItem(id);
  const normalizedResult = normalizeProduct(result);
  await itemValidation.validateAsync(normalizedResult);

  return res.json(normalizedResult);
};

module.exports = {
  search,
  item,
};
