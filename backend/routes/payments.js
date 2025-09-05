const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  testRoute
} = require('../controllers/paymentController');

// Create order endpoint
router.post('/create-order', createOrder);

// Verify payment endpoint
router.post('/verify', verifyPayment);

// Test endpoint to check if payments route is working
router.get('/test', testRoute);

module.exports = router;