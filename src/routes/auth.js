const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('username').isLength({ min: 3 })
  ],
  authController.register
);

router.post('/login', authController.login);

module.exports = router;