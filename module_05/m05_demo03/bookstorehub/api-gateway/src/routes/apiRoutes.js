const { Router } = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimiter = require('../middlewares/rateLimiter');
const {
  validateSearchParams,
  threatDetection,
} = require('../middlewares/threatDetection');

const router = Router();

// Proxy configuration for the book service
router.use(
  '/books',
  validateSearchParams,
  rateLimiter,
  threatDetection,
  createProxyMiddleware({
    target: 'http://localhost:3011', // Target host for book service
    changeOrigin: true, // for virtual hosted sites
    logLevel: 'debug', // Log level to debug
  })
);

// Proxy configuration for the payment service
router.use(
  '/payment',
  rateLimiter,
  threatDetection,
  createProxyMiddleware({
    target: 'http://localhost:3012', // Target host for payment service
    changeOrigin: true, // for virtual hosted sites
    logLevel: 'debug', // Log level to debug
  })
);

module.exports = router;
