const express = require('express');

const bodyParser = require('body-parser');
const oauthServer = require('./oauth/oauthServer'); // Assuming this file exists and is correct
const jwtVerify = require('./../../../common/auth/jwtVerfiy'); // Adjust the path as needed

const app = express();
app.use(bodyParser.json());

// Simulate payment endpoint
app.post('/api/pay', jwtVerify, (req, res) => {
  // Extract payment details from the request body
  const { bookId, cost } = req.body;

  console.log(`Processing payment for bookId ${bookId} with cost $${cost}`);
  console.log(`User ${req.user.id} is purchasing bookId ${bookId}`);

  // Simulate payment processing
  console.log('Connecting to third-party payment processor via OAuth...');

  // Here you would typically use the access token to make a request to the third-party service
  // For this demo, we'll simulate success from the "payment processor"
  setTimeout(() => {
    console.log(
      `Payment of $${cost} for bookId ${bookId} processed successfully.`
    );
    res.json({ message: 'Payment successful!', orderId: 'randomOrderId123' });
  }, 2000); // Simulating async operation with setTimeout
});

app.use('/api/oauth', oauthServer); // OAuth server setup

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));
