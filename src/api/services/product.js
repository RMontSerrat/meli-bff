const axios = require('axios');

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

exports.getItems = async (q) => {
  try {
    const url = `${process.env.MELI_API_SEARCH_URL}?q=${q}&limit=10`;

    const result = await axios({
      method: 'get',
      url,
      headers,
    });
    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}

exports.getItem = async (id) => {
  try {
    const getItem =  axios({
      method: 'get',
      url: `${process.env.MELI_API_ITEMS_URL}/${id}`,
      headers,
    });
    const getDescription =  axios({
      method: 'get',
      url: `${process.env.MELI_API_ITEMS_URL}/${id}/description`,
      headers,
    });

    const [item, itemDescription] = await Promise.all([getItem, getDescription]);

    return { ...item.data, ...itemDescription.data };
  } catch(e) {
    throw new Error(e);
  }
};
