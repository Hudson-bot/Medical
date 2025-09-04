const PatientMedicalDetail = require('../models/PatientMedicalDetail');
const Appointment = require('../models/Appointment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/prescriptions/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'prescription-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Update patient medical details
exports.updatePatientDetails = async (req, res) => {
  try {
    const { patientId, hemoglobin, bloodPressure, heartRate, prescription } = req.body;
    const doctorId = req.user.id;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required"
      });
    }

    // Find or create medical details
    let medicalDetail = await PatientMedicalDetail.findOne({
      patientId: patientId,
      doctorId: doctorId
    });

    if (!medicalDetail) {
      medicalDetail = new PatientMedicalDetail({
        patientId,
        doctorId
      });
    }

    // Update fields
    if (hemoglobin !== undefined) medicalDetail.hemoglobin = hemoglobin;
    if (bloodPressure !== undefined) medicalDetail.bloodPressure = bloodPressure;
    if (heartRate !== undefined) medicalDetail.heartRate = heartRate;
    if (prescription !== undefined) medicalDetail.prescription = prescription;
    
    medicalDetail.lastUpdated = new Date();

    await medicalDetail.save();
    await medicalDetail.populate('patientId', 'name email');
    await medicalDetail.populate('doctorId', 'name doctorType');

    res.json({
      success: true,
      message: "Patient medical details updated successfully",
      data: { medicalDetail }
    });
  } catch (err) {
    console.error('Update patient details error:', err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

// Upload prescription PDF
exports.uploadPrescription = async (req, res) => {
  try {
    const { patientId } = req.body;
    const doctorId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file"
      });
    }

    if (!patientId) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: "Patient ID is required"
      });
    }

    let medicalDetail = await PatientMedicalDetail.findOne({
      patientId: patientId,
      doctorId: doctorId
    });

    if (!medicalDetail) {
      medicalDetail = new PatientMedicalDetail({
        patientId,
        doctorId
      });
    }

    // If there's an existing PDF, delete it
    if (medicalDetail.prescriptionPdf && medicalDetail.prescriptionPdf.path) {
      try {
        fs.unlinkSync(medicalDetail.prescriptionPdf.path);
      } catch (err) {
        console.error('Error deleting old PDF:', err);
      }
    }

    // Update prescription PDF info
    medicalDetail.prescriptionPdf = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      uploadDate: new Date()
    };

    medicalDetail.lastUpdated = new Date();
    await medicalDetail.save();

    res.json({
      success: true,
      message: "Prescription PDF uploaded successfully",
      data: {
        filename: medicalDetail.prescriptionPdf.filename,
        originalName: medicalDetail.prescriptionPdf.originalName
      }
    });
  } catch (err) {
    console.error('Upload prescription error:', err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

// Get medical details for a patient
exports.getPatientMedicalDetails = async (req, res) => {
  try {
    const { patientId } = req.params;
    const doctorId = req.user.id;

    const medicalDetail = await PatientMedicalDetail.findOne({
      patientId: patientId,
      doctorId: doctorId
    })
    .populate('patientId', 'name email patientInfo')
    .populate('doctorId', 'name doctorType');

    if (!medicalDetail) {
      return res.status(404).json({
        success: false,
        message: "Medical details not found for this patient"
      });
    }

    res.json({
      success: true,
      data: { medicalDetail }
    });
  } catch (err) {
    console.error('Get medical details error:', err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Download prescription PDF
exports.downloadPrescription = async (req, res) => {
  try {
    const { patientId } = req.params;
    const doctorId = req.user.id;

    const medicalDetail = await PatientMedicalDetail.findOne({
      patientId: patientId,
      doctorId: doctorId
    });

    if (!medicalDetail || !medicalDetail.prescriptionPdf || !medicalDetail.prescriptionPdf.path) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found"
      });
    }

    const filePath = medicalDetail.prescriptionPdf.path;
    const fileName = medicalDetail.prescriptionPdf.originalName;

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({
          success: false,
          message: "Error downloading file"
        });
      }
    });
  } catch (err) {
    console.error('Download prescription error:', err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get medical details for the authenticated patient
exports.getPatientOwnMedicalDetails = async (req, res) => {
  try {
    const patientId = req.user.id;

    // Get the most recent medical details for this patient
    const medicalDetail = await PatientMedicalDetail.findOne({
      patientId: patientId
    })
    .populate('doctorId', 'name doctorType')
    .sort({ lastUpdated: -1 }); // Get the most recent record

    res.json({
      success: true,
      data: { 
        medicalDetail: medicalDetail || {} 
      }
    });
  } catch (err) {
    console.error('Get patient medical details error:', err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};