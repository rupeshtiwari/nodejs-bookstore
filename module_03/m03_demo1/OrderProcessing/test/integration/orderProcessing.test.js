const request = require('supertest');
const app = require('../../index'); // Adjust this path based on the actual location of your index.js
const mongoose = require('mongoose');

describe('Order Processing - Integration', () => {
  afterAll(async () => {
    await mongoose.disconnect();
    // If you have a reference to the server, shut it down here
  });

  it('creates an order and responds with 201 status', async () => {
    const orderData = {
      customerId: '123',
      items: [{ bookId: 'book1', quantity: 1 }],
    };
    const response = await request(app).post('/api/orders').send(orderData);

    expect(response.statusCode).toBe(201);
    expect(response.body.totalAmount).toBeGreaterThan(0);
  });
});
