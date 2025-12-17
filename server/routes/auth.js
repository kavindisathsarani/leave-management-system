const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { loginValidation, validate } = require('../middleware/validation');

// POST /auth/login - Login for both Admin and Employee
router.post('/login', loginValidation, validate, login);

module.exports = router;

