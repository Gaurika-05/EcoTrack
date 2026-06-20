const mongoose = require('mongoose');

const footprintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Transportation', 'Energy', 'Food', 'Shopping']
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  co2Equivalent: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Footprint', footprintSchema);
