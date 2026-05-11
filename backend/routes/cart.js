const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/cart
router.get('/', authMiddleware, cartController.getCart);

// POST /api/cart/add
router.post('/add', authMiddleware, cartController.addToCart);

// POST /api/cart/remove
router.post('/remove', authMiddleware, cartController.removeFromCart);

// POST /api/cart/clear
router.post('/clear', authMiddleware, cartController.clearCart);

module.exports = router;