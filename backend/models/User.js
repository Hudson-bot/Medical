// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: String
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  doctorType: { 
    type: String, 
    required: function() {
      return this.role === 'Doctor';
    } 
  },
  // Patient-specific fields
  patientInfoCompleted: {
    type: Boolean,
    default: false
  },
  patientInfo: {
    age: Number,
    gender: String,
    phone: String,
    address: String,
    emergencyContact: String,
    medicalHistory: String,
    allergies: String,
    bloodGroup: String
  }
});

module.exports = mongoose.model('User', userSchema);