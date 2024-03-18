const express = require('express');
const axios = require('axios');
const { getPaymentServiceUrl } = require('./consul');
const app = express();
const PORT = 4000;

app.post('/create-order', async (req, res) => {
  try {
    console.log('Attempting to create order...');
    
    const paymentServiceUrl = await getPaymentServiceUrl();
    console.log(`Payment Service URL: ${paymentServiceUrl}`);

    const paymentResponse = await axios.post(
      `${paymentServiceUrl}/process`,
      {},
      { timeout: 5000 }
    );

    console.log('Payment response:', paymentResponse.data);
    res.json({
      orderStatus: 'Order placed successfully',
      paymentStatus: paymentResponse.data,
    });
  } catch (error) {
    console.error('Error contacting payment service:', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    res.status(500).json({
      orderStatus: 'Order failed',
      error: 'Payment processing failed',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Application specific logging, throwing an error, or other logic here
});
