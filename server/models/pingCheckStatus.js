const mongoose = require('mongoose');

const pingCheckStatusSchema = new mongoose.Schema({
  pingCheck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PingCheck',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    default: null,
  },
});

const PingCheckStatus = mongoose.model('PingCheckStatus', pingCheckStatusSchema);

module.exports = PingCheckStatus;
