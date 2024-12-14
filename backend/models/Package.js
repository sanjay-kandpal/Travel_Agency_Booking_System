// models/Package.js
const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  availableDates: [{
    type: Date,
    required: true
  }],
  imageUrl: {
    type: String,
    required: true
  },
  maxTravelers: {
    type: Number,
    default: 20
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging'],
    default: 'Easy'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', PackageSchema);

