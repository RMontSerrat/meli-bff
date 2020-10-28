const axios = require('axios');

const instance = axios.create({
  header: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const getItems = async (q) => {
  const url = `${process.env.MELI_API_SEARCH_URL}?q=${q}&limit=4`;
  const result = await axios.get(url);
  return result.data;
};

const getItem = async (id) => {
  const url = `${process.env.MELI_API_ITEMS_URL}/${id}`;
  const getCurrentItem = instance.get(url);
  const getDescription = axios.get(`${url}/description`);

  const [item, itemDescription] = await Promise.all([getCurrentItem, getDescription]);

  return { ...item.data, ...itemDescription.data };
};

module.exports = {
  getItems,
  getItem,
};
