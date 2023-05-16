const mongoose = require('mongoose');

const pingCheckSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  interval: {
    type: Number,
    default: 30000 // Default interval is 30 seconds
  },
  status: {
    type: Boolean,
    default: true // Default status is active
  },
  lastCheck: {
    type: Date,
    default: Date.now
  },
  latencyHistory: [{
    latency: {
      type: Number,
      required: true
    },
    checkedAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('PingCheck', pingCheckSchema);
