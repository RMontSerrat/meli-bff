/* eslint-disable no-unused-expressions */

const request = require('supertest');
const { expect } = require('chai');
const httpStatus = require('http-status');
const app = require('../../../index');
const {
  searchValidation,
  itemValidation,
} = require('../../validations/product.validation');

describe('Items API', async () => {
  it('GET /api/items', () => request(app)
    .get('/api/items')
    .query({ q: 'tenis' })
    .expect(httpStatus.OK)
    .then(async (res) => {
      const { error } = searchValidation.validate(JSON.parse(res.text));
      expect(error).to.be.undefined;
    }));

  it('GET /api/items without q', () => request(app)
    .get('/api/items')
    .expect(httpStatus.UNPROCESSABLE_ENTITY));

  it('GET /api/items/id', () => {
    const id = 'MLA837664226';
    return request(app)
      .get(`/api/items/${id}`)
      .expect(httpStatus.OK)
      .then(async (res) => {
        const { error } = itemValidation.validate(JSON.parse(res.text));
        expect(error).to.be.undefined;
      });
  });
});
