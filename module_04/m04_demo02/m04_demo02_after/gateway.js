const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 3009;

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to the API routes
app.use('/api/', limiter);

app.all('/api/*', (req, res) => {
  // Forward the request to the respective service
  // For simplicity, just sending a response here
  res.send('Request forwarded to service with security policies!');
});

app.listen(PORT, () => {
  console.log(`Secure API Gateway running on http://localhost:${PORT}`);
});
