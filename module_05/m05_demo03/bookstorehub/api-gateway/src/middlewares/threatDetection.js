const { validationResult, check } = require('express-validator');

// Middleware for validating query parameters
const validateSearchParams = [
  check('search')
    .isAlphanumeric()
    .withMessage('Search term must be alphanumeric'),
  // Add other validations as needed
];

const threatDetection = (req, res, next) => {
  // Run the validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = { threatDetection, validateSearchParams };
