const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  disease: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: '/images/medicines.jpg'
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 100,
    min: 0
  },
  prescriptionRequired: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: 'General'
  },
  manufacturer: {
    type: String,
    default: ''
  },
  dosage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Create index for searching
medicineSchema.index({ name: 'text', disease: 'text', description: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);