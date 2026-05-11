const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/orders (place order)
router.post('/', authMiddleware, orderController.placeOrder);

// GET /api/orders (get user's orders)
router.get('/', authMiddleware, orderController.getOrders);

module.exports = router;