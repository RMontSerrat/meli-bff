const getCategories = (result) => {
  if (!result.filters) return [];
  const categories = result.filters.find(item => item.id === 'category').values.map(item => item.path_from_root);
  return categories.flat().map(item => item.name);
}

const getPriceInteger = (price) => Number(price.toFixed(2).split('.')[0]);

const getPriceDecimals = (price) => Number(price.toFixed(2).split('.')[1]);

const commonProperties = (item) => ({
  id: item.id,
  title: item.title,
  description: item.plain_text,
  price: {
    currency: item.currency_id,
    amount: getPriceInteger(item.price),
    decimals: getPriceDecimals(item.price),
  },
  condition: item.condition,
  free_shipping: item.shipping.free_shipping,
});

const normalizeSearchProducts = (result) => {
  if (!result || result.results.length <= 0) return [];
  const categories = getCategories(result);
  const items = result.results.map(item => {
    const common = commonProperties(item);
    return {
      ...common,
      picture: item.thumbnail,
      address: {
        state_id: item.address.state_id,
        state_name: item.address.state_name,
        city_id: item.address.city_id || null,
        city_name: item.address.city_name,
      },
    }});

  return {
    categories,
    items,
  };
}

const normalizeProduct = (result) => {
  const common = commonProperties(result);
  return {
    item: {
      ...common,
      picture: result.pictures && result.pictures.length > 0 ? result.pictures[0].url : null,
      sold_quantity: result.sold_quantity,
    }
  };
}

module.exports = {
  normalizeSearchProducts,
  normalizeProduct,
}
