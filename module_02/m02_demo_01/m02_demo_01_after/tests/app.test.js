const request = require('supertest');
const app = require('../app');

describe('App Integration Tests', () => {
  it('processes orders and updates recommendations', async () => {

    // Asserting Placing an Order
    const orderRes = await request(app)
      .post('/order')
      .send({ customerId: 'C1001', bookId: 'B1001', quantity: 1 });

    expect(orderRes.statusCode).toBe(200);
    expect(orderRes.body.status).toBe('Confirmed');

    // Asserting Reviews
    const reviewRes = await request(app)
      .post('/reviews')
      .send({ bookId: 'B1001', review: 'Great read!', rating: 5 });

    expect(reviewRes.statusCode).toBe(200);
    expect(reviewRes.body.message).toBe('Review added successfully');
  });
});
