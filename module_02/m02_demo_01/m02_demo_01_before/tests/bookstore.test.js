const request = require('supertest');
const app = require('../bookStore');

describe('Order Processing and Reviews', () => {
  
  describe('POST /order', () => {
    it('should place an order successfully when stock is sufficient', async () => {
      const res = await request(app).post('/order').send({
        customerId: 'C1001',
        bookId: 'B1001',
        quantity: 1,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Order placed successfully');
      expect(res.body).toHaveProperty('status', 'Confirmed');
    });

    it('should not place an order when stock is insufficient', async () => {
      const res = await request(app).post('/order').send({
        customerId: 'C1001',
        bookId: 'B1001',
        quantity: 11, // Assuming initial stock is 10
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        'message',
        'Book unavailable or insufficient stock'
      );
    });
  });

  describe('POST /reviews', () => {
    it('should add a review successfully', async () => {
      const res = await request(app).post('/reviews').send({
        bookId: 'B1001',
        review: 'Great read!',
        rating: 5,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Review added successfully');
    });
  });
});
