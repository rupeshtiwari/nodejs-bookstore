const express = require('express');
const rateLimit = require('express-rate-limit');
const axios = require('axios'); // Add axios for making requests to UserService

const app = express();
const PORT = 3000;

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to the API routes
app.use('/api/', limiter);

// Forward requests to the UserService
const userServiceUrl = 'http://localhost:3000'; // Replace with your UserService URL

app.all('/api/*', async (req, res) => {
  // You can add logic here to route requests to different services based on the route path
  const targetUrl = `${userServiceUrl}${req.originalUrl}`;

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(
      'Request failed. Error:',
      error.response ? error.response.status : error.message
    );
    res
      .status(error.response ? error.response.status : 500)
      .send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Secure API Gateway running on http://localhost:${PORT}`);
});
