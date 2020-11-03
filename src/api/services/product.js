const { setup } = require('axios-cache-adapter');

const axiosInstance = setup({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  cache: {
    maxAge: 15 * 60 * 1000, // 15 minutes
  },
});

const getItems = async (q) => {
  try {
    const url = `${process.env.MELI_API_SEARCH_URL}?q=${q}&limit=4`;
    const result = await axiosInstance.get(url);
    return result.data;
  } catch (e) {
    return null;
  }
};

const getItem = async (id) => {
  try {
    const url = `${process.env.MELI_API_ITEMS_URL}/${id}`;
    const getCurrentItem = axiosInstance.get(url);
    const getDescription = axiosInstance.get(`${url}/description`);

    const [item, itemDescription] = await Promise.all([getCurrentItem, getDescription]);

    return { ...item.data, ...itemDescription.data };
  } catch (e) {
    return null;
  }
};

module.exports = {
  getItems,
  getItem,
};
