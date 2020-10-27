/* eslint-disable no-unused-expressions */

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../index');
const {
  searchValidation,
  itemValidation,
} = require('../../api/validations/product.validation');

describe('Items API', async () => {
  it('GET /api/items', () => request(app)
    .get('/api/items')
    .query({ q: 'tenis' })
    .expect(200)
    .then(async (res) => {
      const { error } = searchValidation.validate(JSON.parse(res.text));
      expect(error).to.be.undefined;
    }));

  it('GET /api/items without q', () => request(app)
    .get('/api/items')
    .expect(422));

  it('GET /api/items/id', () => {
    const id = 'MLA837664226';
    return request(app)
      .get(`/api/items/${id}`)
      .expect(200)
      .then(async (res) => {
        const { error } = itemValidation.validate(JSON.parse(res.text));
        expect(error).to.be.undefined;
      });
  });
});
