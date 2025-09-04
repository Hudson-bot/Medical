const express = require('express');
const router = express.Router();
const {
  updatePatientDetails,
  uploadPrescription,
  getPatientMedicalDetails,
  downloadPrescription,
  upload,
  getPatientOwnMedicalDetails
} = require('../controllers/medicalDetailController');
const auth = require('../middleware/auth');

// All routes require authentication
router.post('/update', auth, updatePatientDetails);
router.post('/upload-prescription', auth, upload.single('prescriptionPdf'), uploadPrescription);
router.get('/patient/:patientId', auth, getPatientMedicalDetails);
router.get('/:patientId/download-prescription', auth, downloadPrescription);
router.get('/patient', auth, getPatientOwnMedicalDetails);

module.exports = router;