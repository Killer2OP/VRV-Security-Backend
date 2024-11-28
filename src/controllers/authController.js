const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { createAuditLog } = require('../utils/audit');

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const user = new User({
        username,
        email,
        password,
        roles: [] // Will be assigned by admin
      });

      await user.save();
      createAuditLog(user._id, 'USER_REGISTERED', 'auth', { email });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).populate('roles');

      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }

      if (user.status !== 'active') {
        throw new Error('Account is not active');
      }

      // Update login stats
      user.lastLogin = new Date();
      user.loginAttempts.count = 0;
      await user.save();

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      createAuditLog(user._id, 'USER_LOGIN', 'auth', {
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });

      res.json({ token, user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles
      }});
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
};

module.exports = authController;
