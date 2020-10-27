const Joi = require('joi');

const commonItem = {
  id: Joi.string().alphanum().required(),
  title: Joi.string().required(),
  description: Joi.string(),
  price: {
    currency: Joi.string().min(3).required(),
    amount: Joi.number().required(),
    decimals: Joi.number(),
  },
  picture: Joi.string().required(),
  condition: Joi.string().required(),
  free_shipping: Joi.boolean(),
}
const searchValidation = Joi.object({
  items: Joi.array().items(Joi.object({
    ...commonItem,
    address: {
      state_id: Joi.string(),
      state_name: Joi.string().required(),
      city_id: Joi.string().allow(null),
      city_name: Joi.string().allow(null),
    },
  })),
  categories: Joi.array().items(Joi.string()),
});

const itemValidation = Joi.object({
  item: Joi.object({
    ...commonItem,
    sold_quantity: Joi.number(),
  })
});

module.exports = {
  searchValidation,
  itemValidation,
}