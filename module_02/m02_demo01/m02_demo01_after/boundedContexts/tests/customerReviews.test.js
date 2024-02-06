const request = require('supertest');
const app = require('../../app');
let server;

describe('Customer Reviews', () => {

  it('adds a review successfully', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({ bookId: 'B1001', review: 'Incredible journey!', rating: 5 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Review added successfully'
    );
  });
});
