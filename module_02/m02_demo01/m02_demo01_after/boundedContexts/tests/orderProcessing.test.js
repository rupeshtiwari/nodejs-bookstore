const request = require('supertest');
const app = require('../../app'); // Update the path as necessary

describe('Order Processing', () => {
   
  it('places an order successfully when stock is sufficient', async () => {
    const response = await request(app)
      .post('/order')
      .send({ customerId: 'C1001', bookId: 'B1001', quantity: 1 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Order placed successfully'
    );
  });

  it('fails to place an order when stock is insufficient', async () => {
    const response = await request(app)
      .post('/order')
      .send({ customerId: 'C1001', bookId: 'B1001', quantity: 11 });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Book unavailable or insufficient stock'
    );
  });
});
