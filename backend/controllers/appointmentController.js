const Appointment = require('../models/Appointment');
const User = require('../models/User');
const mongoose = require('mongoose');

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
    const { doctorId, disease, date, time, notes, patientName } = req.body;
    
    // Debug logging
    console.log("Received appointment data:", { doctorId, disease, date, time, notes, patientName });
    console.log("Logged in user:", req.user.name);
    
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
    const finalPatientName = patientName || req.user.name;
    console.log("Final patient name being saved:", finalPatientName);
    
    const appointment = new Appointment({
      patientId: req.userId,
      doctorId,
      patientName: finalPatientName, // Use provided patientName or fallback to logged-in user's name
      doctorName: doctor.name,
      disease,
      date,
      time,
      notes: notes || ''
    });

    await appointment.save();
    console.log("Appointment saved with patient name:", appointment.patientName);

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


// Book appointment for guest (non-logged-in user)
// Alternative approach if you can't modify the model
exports.bookAppointmentGuest = async (req, res) => {
  try {
    const { doctorId, disease, date, time, notes, patientName, patientEmail, patientPhone } = req.body;
    
    // Validate required fields
    if (!doctorId || !disease || !date || !time || !patientName || !patientEmail || !patientPhone) {
      return res.status(400).json({ 
        success: false,
        message: "All required fields must be provided" 
      });
    }

    // Check if doctor exists and get doctor name
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(404).json({ 
        success: false,
        message: "Doctor not found" 
      });
    }

    // Check for time slot availability
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: 'Scheduled'
    });

    if (existingAppointment) {
      return res.status(400).json({ 
        success: false,
        message: "This time slot is already booked" 
      });
    }

    // Create appointment for guest with required fields
    const appointment = new Appointment({
      doctorId,
      doctorName: doctor.name,
      patientId: new mongoose.Types.ObjectId(), // Generate a dummy ObjectId
      patientName, // Use the guest name from the form
      patientEmail,
      patientPhone,
      disease,
      date,
      time,
      notes: notes || '',
      isGuestBooking: true
    });

    await appointment.save();

    res.status(201).json({ 
      success: true,
      message: "Appointment booked successfully",
      data: { appointment } 
    });
  } catch (err) {
    console.error('Book appointment error:', err);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ 
        success: false,
        message: "Validation error", 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again later." 
    });
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
          name: appointment.patientName || patient.name, // Use appointment.patientName first, fallback to patient.name
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
    const formattedAppointments = appointments.map(appt => {
      const finalPatientName = appt.patientName || appt.patientId?.name;
      //console.log("Upcoming appointment - appointment.patientName:", appt.patientName, "populated patient.name:", appt.patientId?.name, "final:", finalPatientName);
      
      return {
        _id: appt._id,
        patientName: finalPatientName, // Prioritize appointment.patientName over populated patient.name
        doctorName: appt.doctorId?.name || appt.doctorName,
        date: appt.date,
        time: appt.time,
        disease: appt.disease,
        status: appt.status
      };
    });
    
    res.json({
      appointments: formattedAppointments,
      total: formattedAppointments.length
    });
  } catch (err) {
    console.error('Get upcoming appointments error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get appointment statistics for weekly overview chart
exports.getAppointmentStatsForChart = async (req, res) => {
  try {
    const doctorId = req.user.id;
    
    // Calculate date range for the current week (Monday to Sunday)
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Adjust to Monday
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get Sunday
    endOfWeek.setHours(23, 59, 59, 999);
    
    // Get appointments for this week
    const appointments = await Appointment.find({
      doctorId,
      date: {
        $gte: startOfWeek,
        $lte: endOfWeek
      },
      status: { $in: ['Scheduled', 'Completed'] }
    });
    
    // Initialize data structure for all days of the week
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = weekDays.map(day => ({ 
      day, 
      appointments: 0,
      completed: 0,
      scheduled: 0
    }));
    
    // Count appointments by day and status
    appointments.forEach(appointment => {
      const appointmentDate = new Date(appointment.date);
      const dayIndex = appointmentDate.getDay();
      // Convert Sunday (0) to 6, Monday (1) to 0, etc.
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      
      if (adjustedIndex >= 0 && adjustedIndex < 7) {
        weeklyData[adjustedIndex].appointments++;
        
        if (appointment.status === 'Completed') {
          weeklyData[adjustedIndex].completed++;
        } else if (appointment.status === 'Scheduled') {
          weeklyData[adjustedIndex].scheduled++;
        }
      }
    });
    
    res.json({
      success: true,
      data: weeklyData,
      dateRange: {
        start: startOfWeek.toISOString().split('T')[0],
        end: endOfWeek.toISOString().split('T')[0]
      },
      total: {
        appointments: appointments.length,
        completed: appointments.filter(a => a.status === 'Completed').length,
        scheduled: appointments.filter(a => a.status === 'Scheduled').length
      }
    });
    
  } catch (error) {
    console.error('Error fetching appointment stats for chart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching appointment statistics' 
    });
  }
};

// Get monthly patient visit statistics
exports.getMonthlyVisitStats = async (req, res) => {
  try {
    const { year } = req.query; // optional year filter, defaults to current year
    const currentYear = year ? parseInt(year) : new Date().getFullYear();

    const stats = await Appointment.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          },
          status: { $in: ["Scheduled", "Completed"] }
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          visits: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Map results into all 12 months
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlyData = months.map((m, i) => {
      const stat = stats.find(s => s._id === i + 1);
      return {
        month: m,
        visits: stat ? stat.visits : 0
      };
    });

    res.json({
      success: true,
      year: currentYear,
      data: monthlyData
    });
  } catch (error) {
    console.error("Error fetching monthly visit stats:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching monthly statistics"
    });
  }
};
