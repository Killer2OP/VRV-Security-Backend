const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [{
    resource: String,
    actions: [{
      type: String,
      enum: ['create', 'read', 'update', 'delete']
    }]
  }],
  level: {
    type: Number,
    required: true
  },
  description: String
});

module.exports = mongoose.model('Role', roleSchema);