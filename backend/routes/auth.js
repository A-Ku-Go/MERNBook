const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.register);

// Login (accepts username or email as 'identifier')
router.post('/login', authController.login);

module.exports = router;