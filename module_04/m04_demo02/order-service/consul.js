const Consul = require('consul');
const consul = new Consul();

async function getPaymentServiceUrl() {
  try {
    const services = await consul.catalog.service.nodes('payment-service');
    if (services.length === 0) throw new Error('Payment service not found');
    const service = services[0];
    return `http://${service.ServiceAddress}:${service.ServicePort}`;
  } catch (error) {
    throw error; // or handle the error as needed
  }
}
 
module.exports = { getPaymentServiceUrl };
