const express = require('express');
const router = express.Router();
const {
  updatePatientDetails,
  uploadPrescription,
  getPatientMedicalDetails,
  downloadPrescription,
  upload,
  getPatientOwnMedicalDetails,
  getPatientPrescriptions
} = require('../controllers/medicalDetailController');
const auth = require('../middleware/auth');

// All routes require authentication
router.post('/update', auth, updatePatientDetails);
router.post('/upload-prescription', auth, upload.single('prescriptionPdf'), uploadPrescription);
router.get('/patient/:patientId', auth, getPatientMedicalDetails);
router.get('/patient', auth, getPatientOwnMedicalDetails);
router.get('/prescriptions', auth, getPatientPrescriptions);
router.get('/prescriptions/:id/download', auth, downloadPrescription);

module.exports = router;