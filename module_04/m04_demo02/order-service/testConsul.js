const { getPaymentServiceUrl } = require('./consul');

async function test() {
  try {
    const url = await getPaymentServiceUrl();
    console.log(`Payment service URL: ${url}`);
  } catch (error) {
    console.error(`Error during Consul service discovery: ${error}`);
  }
}

test();
