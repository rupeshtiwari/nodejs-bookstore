// consul.js
const Consul = require('consul');
const consul = new Consul();
const { PORT } = require('./config');

function registerService() {
  const serviceDetails = {
    name: 'payment-service',
    tags: ['payment', 'bookstore'],
    address: 'localhost',
    port: PORT,
    check: {
      http: `http://localhost:${PORT}/health`,
      interval: '10s',
    },
  };

  consul.agent.service.register(serviceDetails, (err) => {
    if (err) {
      throw new Error(`Error registering payment service with Consul: ${err}`);
    }
    console.log('Payment service registered with Consul');
  });
}

module.exports = { registerService };
