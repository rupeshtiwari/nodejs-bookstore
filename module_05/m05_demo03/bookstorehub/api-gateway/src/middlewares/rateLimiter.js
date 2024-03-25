const rateLimit = require('express-rate-limit');

// Setup a custom limiter for demonstration purposes
const customLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 5 requests per windowMs
  message: {
    status: 429,
    message: 'Too many requests! Please wait a moment and try again.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = customLimiter;
