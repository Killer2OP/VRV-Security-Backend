const AuditLog = require('../models/Auditlog');

const createAuditLog = async (userId, action, resource, details) => {
  try {
    const log = new AuditLog({
      user: userId,
      action,
      resource,
      details
    });
    await log.save();
  } catch (error) {
    console.error('Audit log creation failed:', error);
  }
};

module.exports = { createAuditLog };
