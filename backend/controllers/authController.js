const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const PatientMedicalDetail = require('../models/PatientMedicalDetail');

// Define valid doctor specializations (moved to top)
const doctorSpecializations = [
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Orthopedic',
  'Gynecologist',
  'Psychiatrist',
  'Dentist',
  'Ophthalmologist',
  'General Physician'
];

exports.signup = async (req, res) => {
  const { name, email, password, role, doctorType } = req.body;
  
  try {
    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate doctor type if registering as a doctor
    if (role === 'Doctor') {
      if (!doctorType) {
        return res.status(400).json({ message: "Doctor specialization is required" });
      }
      if (!doctorSpecializations.includes(doctorType)) {
        return res.status(400).json({ message: "Invalid doctor specialization" });
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user with doctorType if applicable
    const userData = { 
      name, 
      email, 
      password: hashedPassword, 
      role 
    };
    
    // Add doctorType only if role is Doctor and doctorType is provided
    if (role === 'Doctor' && doctorType) {
      userData.doctorType = doctorType;
    }

    const newUser = await User.create(userData);

    res.status(201).json({ 
      message: "User registered successfully",
      role: newUser.role,
      doctorType: newUser.doctorType || null // Include doctorType in response
    });
  } catch (err) {
    console.error('Signup error:', err);
    
    // Handle duplicate key error (unique email)
    if (err.code === 11000) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.signin = async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Validate role if provided in request
    if (role && user.role !== role) {
      return res.status(400).json({ message: `Invalid role. This account is for ${user.role}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ 
      id: user._id,
      role: user.role 
    }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ 
      message: "Login successful", 
      token, 
      role: user.role,
      name: user.name,
      doctorType: user.doctorType, // Include doctorType in response if applicable
      patientInfoCompleted: user.patientInfoCompleted || false // Include patient info completion status
    });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    // Create reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Create reset link (you'll need to implement the reset page)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    await sendEmail(
      email, 
      "Reset Password", 
      `Hi ${user.name}, click here to reset your password: ${resetLink}`
    );
    
    res.json({ message: "Password reset link sent" });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Optional: Add endpoint to get doctor specializations
exports.getDoctorSpecializations = async (req, res) => {
  try {
    res.json({ specializations: doctorSpecializations });
  } catch (err) {
    console.error('Get specializations error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    // The user ID should be available from the auth middleware
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update patient information and mark as completed
exports.updatePatientInfo = async (req, res) => {
  try {
    const { age, gender, phone, address, emergencyContact, medicalHistory, allergies, bloodGroup } = req.body;
    
    // Validate required fields
    if (!age || !gender || !phone) {
      return res.status(400).json({ message: "Age, gender, and phone are required" });
    }
    
    // Update user with patient information
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        patientInfo: {
          age,
          gender,
          phone,
          address,
          emergencyContact,
          medicalHistory,
          allergies,
          bloodGroup
        },
        patientInfoCompleted: true
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      message: "Patient information updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error('Update patient info error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// In authController.js or new controller
exports.getDoctorsCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'Doctor' });
    res.json({ count });
  } catch (err) {
    console.error('Get doctors count error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPatientsCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'Patient' });
    res.json({ count });
  } catch (err) {
    console.error('Get patients count error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'Patient' })
      .select('name email patientInfo')
      .sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    console.error('Get patients error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'Doctor' })
      .select('name email doctorType')
      .sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    console.error('Get doctors error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create patient user along with default medical record
const createPatientUser = async (userData) => {
  try {
    // Create user
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'Patient',
      patientInfo: userData.patientInfo || {}
    });

    await user.save();

    // Create default medical record with blank fields
    const medicalDetail = new PatientMedicalDetail({
      patientId: user._id,
      doctorId: null, // Will be set when a doctor treats this patient
      appointmentId: null,
      hemoglobin: null,
      bloodPressure: { systolic: null, diastolic: null },
      heartRate: null,
      prescription: ''
    });

    await medicalDetail.save();

    return user;
  } catch (error) {
    throw error;
  }
};