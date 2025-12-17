const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leave: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leave',
    required: true
  },
  action: {
    type: String,
    enum: ['approved', 'rejected'],
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);

