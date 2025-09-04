const express = require('express');
const router = express.Router();
const { 
  bookAppointment, 
  getUserAppointments, 
  getDoctorAppointments,
  getDoctors,
  getAllAppointments,
  getDoctorPatients,
  getUpcomingAppointments,
  bookAppointmentGuest
} = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// Public route - get all doctors
router.get('/doctors', getDoctors);

// Protected routes
router.post('/book', auth, bookAppointment);
router.get('/user-appointments', auth, getUserAppointments);
router.get('/doctor-appointments', auth, getDoctorAppointments);
router.get('/all-appointments', auth, getAllAppointments);
router.get('/doctor-patients', auth, getDoctorPatients);
router.get('/upcoming-appointments', auth, getUpcomingAppointments);
router.post('/book-guest', bookAppointmentGuest);

module.exports = router;