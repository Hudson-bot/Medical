const express = require('express');
const router = express.Router();
const { signup, signin, forgotPassword, getUser, updatePatientInfo, getDoctorsCount, getPatientsCount,getPatients,getDoctors } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.get('/user', auth, getUser);
router.put('/patient-info', auth, updatePatientInfo);
router.get('/count/doctors', auth, getDoctorsCount);
router.get('/count/patients', auth, getPatientsCount);
router.get('/patients',auth,getPatients);
router.get('/doctors',auth,getDoctors); 

module.exports = router;
