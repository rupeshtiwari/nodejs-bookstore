const { validationResult, check } = require('express-validator');

// Middleware for validating and sanitizing query parameters
const validateSearchParams = [
  check('search')
    // Extend validation to allow spaces in addition to alphanumeric characters
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage('Search term must be alphanumeric and can include spaces')

    // Use the trim() method to remove leading and trailing spaces
    .trim()

    // Use the escape() method to remove/escape special characters
    .escape()
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
