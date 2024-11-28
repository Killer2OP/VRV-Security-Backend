const Role = require('../models/Role');
const { createAuditLog } = require('../utils/audit');

const roleController = {
  createRole: async (req, res) => {
    try {
      const { name, permissions, level, description } = req.body;
      
      const role = new Role({
        name,
        permissions,
        level,
        description
      });

      await role.save();
      createAuditLog(req.user._id, 'ROLE_CREATED', 'role', { name });

      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  assignRole: async (req, res) => {
    try {
      const { userId, roleId } = req.body;
      
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      // Prevent role assignment if requester's level is lower
      const requesterMaxLevel = Math.max(...req.user.roles.map(r => r.level));
      const roleToAssign = await Role.findById(roleId);
      
      if (roleToAssign.level >= requesterMaxLevel) {
        throw new Error('Cannot assign role with equal or higher level');
      }

      user.roles.push(roleId);
      await user.save();

      createAuditLog(req.user._id, 'ROLE_ASSIGNED', 'role', {
        userId,
        roleId
      });

      res.json({ message: 'Role assigned successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = roleController;