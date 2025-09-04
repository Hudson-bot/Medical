const mongoose = require('mongoose');

const patientMedicalDetailSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  hemoglobin: {
    type: Number,
    min: 0,
    max: 20,
    default: null
  },
  bloodPressure: {
    systolic: {
      type: Number,
      min: 60,
      max: 250,
      default: null
    },
    diastolic: {
      type: Number,
      min: 40,
      max: 150,
      default: null
    }
  },
  heartRate: {
    type: Number,
    min: 30,
    max: 250,
    default: null
  },
  prescription: {
    type: String,
    trim: true,
    default: ''
  },
  prescriptionPdf: {
    filename: String,
    originalName: String,
    path: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
patientMedicalDetailSchema.index({ patientId: 1 });
patientMedicalDetailSchema.index({ doctorId: 1 });
patientMedicalDetailSchema.index({ appointmentId: 1 });

module.exports = mongoose.model('PatientMedicalDetail', patientMedicalDetailSchema);