const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  durationMonths: Number,
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  paymentStatus: { type: String, default: 'paid' }
});

module.exports = mongoose.model('Member', memberSchema);
