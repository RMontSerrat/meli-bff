const axios = require('axios');
const APIError = require('../middlewares/apiError');
const logger = require('../../config/logger');

const instance = axios.create({
  header: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const getItems = async (q) => {
  try {
    const url = `${process.env.MELI_API_SEARCH_URL}?q=${q}&limit=4`;
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    logger.error(`getItems error: ${error}`);
    throw new APIError({
      message: error && error.response ? error.response.data.message : 'getItems error',
      status: error && error.response ? error.response.data.status : null,
    });
  }
};

const getItem = async (id) => {
  try {
    const url = `${process.env.MELI_API_ITEMS_URL}/${id}`;
    const getCurrentItem = instance.get(url);
    const getDescription = axios.get(`${url}/description`);

    const [item, itemDescription] = await Promise.all([getCurrentItem, getDescription]);

    return { ...item.data, ...itemDescription.data };
  } catch (error) {
    logger.error(`getItem error: ${error}`);
    throw new APIError({
      message: error && error.response ? error.response.data.message : 'getItem error',
      status: error && error.response ? error.response.data.status : null,
    });
  }
};

module.exports = {
  getItems,
  getItem,
};
