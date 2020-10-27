const faker = require('faker');
const { expect } = require('chai');
const { normalizeSearchProducts, normalizeProduct } = require('../../../api/helpers/normalizeProduct');

const price = faker.finance.amount();
const currencyId = faker.finance.currencyCode();
const commonObj = {
  id: faker.random.uuid().split('-')[0],
  title: faker.commerce.productName(),
  condition: faker.random.word(),
  free_shipping: faker.random.boolean(),
}

const item = {
  ...commonObj,
  price: {
    currency: currencyId,
    amount: Number(price.toFixed(2).split('.')[0]),
    decimals: Number(price.toFixed(2).split('.')[1]),
  },
}

describe('normalizeSearchProducts', () => {
  it('Should validate normalizeSearchProducts', () => {
    const categories = [faker.commerce.department(1)]
    const thumbnail = faker.image.imageUrl();
    const plain_text = faker.random.words();
    const address = {
      state_id: faker.random.uuid().split('-')[0],
      state_name: faker.address.state(),
      city_id: faker.random.uuid().split('-')[0],
      city_name: faker.address.city(),
    };
  
    const objResult = {
      filters: [{
        id: 'category',
        values: [{
          path_from_root: {
            id: 1,
            name: categories[0]
          }
        }]
      }],
      results: [{
        ...commonObj,
        address,
        currency_id: currencyId,
        price,
        thumbnail,
        plain_text,
        shipping: {
          free_shipping: commonObj.free_shipping,
        }
      }]
    }
    const objCompare = {
      categories: categories,
      items: [{
        ...item,
        picture: thumbnail,
        description: plain_text,
        address,
      }],
    }
    const normalized = normalizeSearchProducts(objResult)
    expect(objCompare).to.deep.equal(normalized);
  });
});

describe('normalizeProduct', () => {
  it('Should validate normalizeProduct', () => {
    const objResult = {
      ...commonObj,
      currency_id: currencyId,
      price,
      plain_text: faker.random.words(),
      shipping: {
        free_shipping: commonObj.free_shipping,
      },
      sold_quantity: faker.random.word(),
      pictures: [{ 
        url: faker.image.imageUrl,
      }]
    };
    const objCompare = {
      item: {
        ...item,
        picture: objResult.pictures[0].url,
        description: objResult.plain_text,
        sold_quantity: objResult.sold_quantity,
      }
    }
    const normalized = normalizeProduct(objResult)
    expect(objCompare).to.deep.equal(normalized);
  });
});
