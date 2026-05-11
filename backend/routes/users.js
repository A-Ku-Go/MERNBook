const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/users/me
router.get('/me', authMiddleware, userController.getProfile);

module.exports = router;