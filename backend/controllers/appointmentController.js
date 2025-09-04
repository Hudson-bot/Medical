const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'Doctor' }).select('name doctorType');
    res.json(doctors);
  } catch (err) {
    console.error('Get doctors error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Book appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, disease, date, time, notes } = req.body;
    
    // Validate required fields
    if (!doctorId || !disease || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check for time slot availability (optional enhancement)
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: 'Scheduled'
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    // Create appointment
    const appointment = new Appointment({
      patientId: req.userId,
      doctorId,
      patientName: req.user.name,
      doctorName: doctor.name,
      disease,
      date,
      time,
      notes: notes || ''
    });

    await appointment.save();

    res.status(201).json({ 
      message: "Appointment booked successfully",
      appointment 
    });
  } catch (err) {
    console.error('Book appointment error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.userId })
      .populate('doctorId', 'name doctorType')
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (err) {
    console.error('Get appointments error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get doctor appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.userId })
      .populate('patientId', 'name')
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (err) {
    console.error('Get doctor appointments error:', err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllAppointments = async (req, res) => {
  try {
    // Get pagination parameters from query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50; // Increased default limit
    const skip = (page - 1) * limit;
    
    // Get optional filter parameters from query string
    const { status, doctorId, patientId, date, search } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (doctorId) filter.doctorId = doctorId;
    if (patientId) filter.patientId = patientId;
    if (date) filter.date = new Date(date);
    
    // Add search functionality if needed
    if (search) {
      filter.$or = [
        { patientName: { $regex: search, $options: 'i' } },
        { doctorName: { $regex: search, $options: 'i' } },
        { disease: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Get appointments with pagination and filters
    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name doctorType')
      .sort({ date: -1, time: 1 }) // Sort by most recent first
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Appointment.countDocuments(filter);
    
    res.json({
      appointments,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalAppointments: total
    });
  } catch (err) {
    console.error('Get all appointments error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// for doctor to get their patients with details
exports.getDoctorPatients = async (req, res) => {
  try {
    const doctorId = req.user.id; // Get doctor ID from authenticated user
    
    // Find all appointments for this doctor
    const appointments = await Appointment.find({ doctorId })
      .populate('patientId', 'name age patientInfo')
      .sort({ date: -1 }); // Sort by most recent
    
    // Extract unique patients from appointments
    const patientMap = new Map();
    
    appointments.forEach(appointment => {
      if (appointment.patientId && !patientMap.has(appointment.patientId._id)) {
        const patient = appointment.patientId;
        patientMap.set(patient._id, {
          _id: patient._id,
          name: patient.name,
          age: patient.patientInfo?.age || 'Not specified',
          condition: appointment.disease,
          status: appointment.status,
          date: appointment.date,
          priority: appointment.priority || 'Routine'
        });
      }
    });
    
    const patients = Array.from(patientMap.values());
    
    res.json({
      patients,
      total: patients.length
    });
  } catch (err) {
    console.error('Get doctor patients error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// to fetch upcoming appointments
exports.getUpcomingAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // Build filter for upcoming appointments
    const filter = {
      status: { $in: ["Scheduled", "Upcoming"] },
      date: { $gte: new Date() } // Only future dates
    };
    
    // Add role-based filtering
    if (userRole === 'Doctor') {
      filter.doctorId = userId;
    } else if (userRole === 'Patient') {
      filter.patientId = userId;
    }
    // Admin can see all upcoming appointments
    
    // Get appointments with patient/doctor info
    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name')
      .populate('doctorId', 'name')
      .sort({ date: 1, time: 1 }) // Sort by soonest first
      .limit(10); // Limit to 10 upcoming appointments
    
    // Format the response
    const formattedAppointments = appointments.map(appt => ({
      _id: appt._id,
      patientName: appt.patientId?.name || appt.patientName,
      doctorName: appt.doctorId?.name || appt.doctorName,
      date: appt.date,
      time: appt.time,
      disease: appt.disease,
      status: appt.status
    }));
    
    res.json({
      appointments: formattedAppointments,
      total: formattedAppointments.length
    });
  } catch (err) {
    console.error('Get upcoming appointments error:', err);
    res.status(500).json({ message: "Server error" });
  }
};